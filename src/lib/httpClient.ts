interface InitOpts {
  baseUrl: string
  defaultOpts?: Partial<RequestInit>
}

type Options = Partial<RequestInit> | undefined
  
export class HttpClient {
  private baseUrl
  private defaultOpts: Partial<RequestInit> = {
    headers: {
      Accept: 'application.json',
      'Content-Type': 'application/json'
    }
  }
  
  constructor(opts: InitOpts) {
    if (opts.baseUrl) {
      // Strip trailing '/' from base URL
      this.baseUrl = opts.baseUrl.slice(-1) === '/'
        ? opts.baseUrl.slice(0, -1)
        : opts.baseUrl;
    }
    this.defaultOpts = opts.defaultOpts ?? this.defaultOpts;
  }

  fetch(resource: string, opts: Options): Promise<any> {
    if (resource.slice(0, 1) !== '/') {
      resource = `/${resource}`;
    }
    const url = this.baseUrl ? `${this.baseUrl}${resource}` : resource
    return fetch(url, { ...this.defaultOpts, ...opts }).then(async res => ({ status: res.status, data: await res.json() }))
  }

  get(resource: string, params?: Record<string, string> | undefined, opts?: Options) {
    const queryParams = params ? `?${new URLSearchParams(params).toString()}` : ''
    
    return this.fetch(`${resource}${queryParams}`, { ...opts, method: 'GET' })
  }

  post(resource: string, body: any, opts?: Options) {
    return this.fetch(resource, {body: JSON.stringify(body), ...opts, method: 'POST'})
  }

  put(resource: string, body: any, opts?: Options) {
    return this.fetch(resource, {body: JSON.stringify(body), ...opts, method: 'PUT'})
  }

  delete(resource: string, opts: Options) {
    return this.fetch(resource, {...opts, method: 'DELETE'})
  }
}

export default new HttpClient({
  baseUrl: String(process.env.baseApi)
})