import axios, { AxiosAdapter, AxiosResponse, getAdapter } from 'axios'
import { LRUCache } from 'lru-cache'

// lru-cache
const cache = new LRUCache<string, AxiosResponse>({
  max: 100,
  ttl: 1000,
})

// cache adapter
const defaultAdapter = getAdapter(axios.defaults.adapter)

const cacheAdapter: AxiosAdapter = async (config) => {
  // cache
  if (config.url && config.method?.toLowerCase() === 'get' && config.headers['Use-Cache'] !== 'no') {
    const cacheKey =
      config.method.toLowerCase() +
      config.url +
      JSON.stringify(config.params || {}) +
      JSON.stringify(config.data || {})

    const cached = cache.get(cacheKey)
    // cached response
    if (cached)
      return cached

    // request
    const response = await defaultAdapter(config)
    // only 2xx
    if (response.status >= 200 && response.status < 300) {
      const { request: __, ...rest } = response
      cache.set(cacheKey, rest)
    }

    return response
  }

  // not cache
  return defaultAdapter(config)
}


// axios
const axiosClient = axios.create({
  timeout: 100 * 1000,
  withCredentials: true,
  // adapter: cacheAdapter,
})

axiosClient.interceptors.request.use((config) => {
  config.headers["Accept"] = "application/json"
  return config
})

axiosClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      if (error.response.status === 401) {
        // redirect to login page
        if (window.location.pathname !== '/login')
          window.dispatchEvent(new CustomEvent('auth:unauthorized'))
      }
    }
    return Promise.reject(error)
  }
)

export default axiosClient