// ChatManager.swift
import FirebaseFirestore

final class ChatManager {
  static let shared = ChatManager()
  private let db = Firestore.firestore()
  
  func sendMessage(_ message: Message, to userId: String) {
    let chatRef = db.collection("chats").document()
    try? chatRef.setData(from: message)
  }
  
  func observeMessages(userId: String, completion: @escaping ([Message]) -> Void) {
    db.collection("chats")
      .whereField("participants", arrayContains: userId)
      .addSnapshotListener { snapshot, _ in
        let messages = snapshot?.documents.compactMap { try? $0.data(as: Message.self) } ?? []
        completion(messages)
      }
  }
}
