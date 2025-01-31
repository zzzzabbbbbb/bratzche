// StorageManager.swift
import FirebaseStorage

final class StorageManager {
  static let shared = StorageManager()
  private let storage = Storage.storage().reference()
  
  func uploadPostImage(_ image: UIImage, completion: @escaping (URL?) -> Void) {
    guard let imageData = image.jpegData(compressionQuality: 0.75) else { return }
    
    let postRef = storage.child("posts/\(UUID().uuidString).jpg")
    postRef.putData(imageData, metadata: nil) { _, error in
      guard error == nil else { return }
      postRef.downloadURL { url, _ in
        completion(url)
      }
    }
  }
}
