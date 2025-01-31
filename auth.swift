// AuthenticationManager.swift
import FirebaseAuth

final class AuthenticationManager {
  static let shared = AuthenticationManager()
  
  func signIn(email: String, password: String) async throws -> AuthDataResult {
    return try await Auth.auth().signIn(withEmail: email, password: password)
  }

  func signUp(username: String, email: String, password: String) async throws {
    let result = try await Auth.auth().createUser(withEmail: email, password: password)
    try await Firestore.firestore().collection("users").document(result.user.uid).setData([
      "username": username,
      "email": email,
      "followers": [],
      "following": []
    ])
  }
}
