// FeedViewController.swift
class FeedViewController: UIViewController {
  private var collectionView: UICollectionView!
  private var posts = [Post]() // Your Post model
  
  override func viewDidLoad() {
    super.viewDidLoad()
    setupCollectionView()
    fetchPosts()
  }
  
  private func setupCollectionView() {
    let layout = UICollectionViewCompositionalLayout { sectionIndex, _ in
      let itemSize = NSCollectionLayoutSize(widthDimension: .fractionalWidth(1), heightDimension: .estimated(500))
      let item = NSCollectionLayoutItem(layoutSize: itemSize)
      let group = NSCollectionLayoutGroup.vertical(layoutSize: itemSize, subitems: [item])
      return NSCollectionLayoutSection(group: group)
    }
    
    collectionView = UICollectionView(frame: view.bounds, collectionViewLayout: layout)
    collectionView.register(PostCell.self, forCellWithReuseIdentifier: "PostCell")
    view.addSubview(collectionView)
  }
  
  private func fetchPosts() {
    Firestore.firestore().collection("posts")
      .order(by: "timestamp", descending: true)
      .addSnapshotListener { [weak self] snapshot, _ in
        self?.posts = snapshot?.documents.compactMap { try? $0.data(as: Post.self) } ?? []
        self?.collectionView.reloadData()
      }
  }
}
