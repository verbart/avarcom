export default class {
  constructor($state, Upload, $stateParams, Closed) {
      this.$state = $state;
      this.Closed = Closed;
      this.Upload = Upload;
      this.id = $stateParams.id;

      Closed.get({id: this.id}, response => {
          this.editable = response.data.data;
      }, error => {
          console.log(error);
      });
  }

  onFileSelect(files) {
    console.log(12, files);
    Upload.upload({
      method: 'POST',
      url: '//imgsafe.org/upload',
      file: files[0]
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
    });
  }
}
