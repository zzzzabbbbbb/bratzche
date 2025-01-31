// APIClient.swift
import Combine

struct APIClient {
  static func request<T: Decodable>(_ endpoint: Endpoint) -> AnyPublisher<T, Error> {
    var request = URLRequest(url: endpoint.url)
    request.httpMethod = endpoint.method
    
    return URLSession.shared.dataTaskPublisher(for: request)
      .tryMap { data, response in
        guard let httpResponse = response as? HTTPURLResponse,
              (200...299).contains(httpResponse.statusCode) else {
          throw URLError(.badServerResponse)
        }
        return data
      }
      .decode(type: T.self, decoder: JSONDecoder())
      .receive(on: DispatchQueue.main)
      .eraseToAnyPublisher()
  }
}
