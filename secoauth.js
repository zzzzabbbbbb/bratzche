match /posts/{postId} {
  allow read: if true;
  allow create: if request.auth != null 
    && request.resource.data.caption is string
    && request.resource.data.caption.size() < 500;
}
