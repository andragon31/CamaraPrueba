import { Component } from '@angular/core';
import { Plugins } from '@capacitor/core';
const {CameraPreview} = Plugins;
import { CameraPreviewOptions, CameraPreviewPictureOptions } from '@capacitor-community/camera-preview';

import '@capacitor-community/camera-preview';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  image = null;
  cameraActive = false;
  constructor() {}

  openCamera(){
    const cameraPreviewOptions: CameraPreviewOptions = {
      position:'rear',
      parent:'cameraPreview',
      className: 'cameraPreview',
      height: 10,
      width: 5
    };

    CameraPreview.start(cameraPreviewOptions);
    this.cameraActive = true;
  }

  async stopCamera(){
    await CameraPreview.stop();
    this.cameraActive = false;
  }

  async captureImage(){
    const cameraPreviewPictureOptions: CameraPreviewPictureOptions = {
      quality:100,
      height: 10,
      width: 5
    };

    const result = await CameraPreview.capture(cameraPreviewPictureOptions);
    this.image = `data:image/jpeg;base64,${result.value}`;
    this.stopCamera();
  }

  async flipCamera(){
    await CameraPreview.flip();
  }
}
