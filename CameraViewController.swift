 CameraViewController.swift
import AVFoundation

class CameraViewController: UIViewController {
  private let captureSession = AVCaptureSession()
  
  override func viewDidLoad() {
    super.viewDidLoad()
    setupCamera()
  }
  
  private func setupCamera() {
    guard let device = AVCaptureDevice.default(.builtInWideAngleCamera, for: .video, position: .back),
          let input = try? AVCaptureDeviceInput(device: device) else { return }
    
    captureSession.addInput(input)
    
    let previewLayer = AVCaptureVideoPreviewLayer(session: captureSession)
    previewLayer.frame = view.bounds
    view.layer.addSublayer(previewLayer)
    
    captureSession.startRunning()
  }
  
  @IBAction func capturePhoto(_ sender: UIButton) {
    let photoOutput = AVCapturePhotoOutput()
    let settings = AVCapturePhotoSettings()
    photoOutput.capturePhoto(with: settings, delegate: self)
  }
}

extension CameraViewController: AVCapturePhotoCaptureDelegate {
  func photoOutput(_ output: AVCapturePhotoOutput, didFinishProcessingPhoto photo: AVCapturePhoto, error: Error?) {
    guard let imageData = photo.fileDataRepresentation() else { return }
    // Upload to Firebase Storage
  }
}
