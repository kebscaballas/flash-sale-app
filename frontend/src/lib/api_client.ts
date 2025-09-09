export default class ApiClient {
  private baseUrl: string;

  constructor() {
    this.baseUrl = import.meta.env.VITE_API_BASE_URL;
  }

  async get(pathname: string) {
    const response = await fetch(`${this.baseUrl}${pathname}`, {
      method: 'GET'
    });

    const data = await response.json();

    if (!response.ok) {
      throw data;
    }

    return data;
  }

  async post(pathname: string, body?: { [key:string]: unknown }) {
    const response = await fetch(`${this.baseUrl}${pathname}`, {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify(body)
    });

    const data = await response.json();

    if (!response.ok) {
      throw data;
    }

    return data;
  }
}