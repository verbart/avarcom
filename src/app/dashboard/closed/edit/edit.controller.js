export default class {
  constructor($state, Upload, Lightbox, $uibModal, $stateParams, Closed, CONSTANT) {
    this.$state = $state;
    this.Closed = Closed;
    this.Upload = Upload;
    this.CONSTANT = CONSTANT;
    this.Lightbox = Lightbox;
    this.$uibModal = $uibModal;
    this.id = $stateParams.id;

    Closed.get({id: this.id}, response => {
        this.editable = response.data.data;
    }, error => {
        console.log(error);
    });
  }

  onFileSelect(files) {
    console.log(12, files);
    this.Upload.upload({
      method: 'POST',
      url: this.CONSTANT.API_URL+'/upload',
      headers : {
        'Content-Type': files[0].type
      },
      data: {'files[]': files[0]}
    }).then(response => {
      this.editable.photos.push(response.data.files[0].name);
      this.photosIsChanged = true;
    }, response => {
      console.log('Error status: ' + response.status);
    });
  }
  openImage(index) {
    this.Lightbox.openModal(this.editable.photos, index);
  }
  removeImage(index) {
    this.$uibModal.open({
      component: 'confirmModal',
      size: 'sm',
      resolve: {
        message: () => 'Действительно удалить это фото?'
      }
    }).result.then(() => {
      this.editable.photos.splice(index, 1);
      this.photosIsChanged = true;
    }, () => {
      console.info('modal-component dismissed at: ' + new Date());
    });
  }
  editAccident() {
    this.Closed.update({id: this.id}, this.editable, () => {
        alert('Данные об аварии обновлены');
    });
  }
  sendAccident() {
    this.Closed.send({id: this.id}, this.editable, () => {
      alert('Данные об аварии отправлены');
      this.$state.go('dashboard.closed.edit', {id: this.id}, {reload: true});
    }, error => {
      console.log(error);
    });
  }
}
