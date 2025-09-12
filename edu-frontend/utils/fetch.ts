export async function fetchWithAuth(endpoint: string, authToken: null | string, options: RequestInit = {}): Promise<Response> {
    // Default headers with Authorization
    const defaultHeaders: Record<string, string> = {
        "Content-Type": "application/json",
    };

    if (authToken !== "") {
        defaultHeaders["Authorization"] = `Bearer ${authToken}`;
    }

    const headers = {
        ...defaultHeaders,
        ...options.headers,
    };

    const fetchOptions = {
        ...options,
        headers,
    };

    const response = await fetch(endpoint, fetchOptions);

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
            `HTTP error! Status: ${response.status}, Message: ${errorData.message || response.statusText}`
        );
    }

    return response;
}