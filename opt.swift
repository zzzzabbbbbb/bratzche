// Image Loading (SDWebImage)
imageView.sd_setImage(with: url, placeholderImage: UIImage(named: "placeholder"), options: [.progressiveLoad])

// Pagination
func fetchMorePosts(lastDocument: DocumentSnapshot?) {
  let query = Firestore.firestore().collection("posts")
    .order(by: "timestamp")
    .start(afterDocument: lastDocument)
    .limit(to: 15)
}
