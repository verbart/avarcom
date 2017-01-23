export default class {
    constructor($state, $stateParams, Closed, FileUploader) {
        this.Closed = Closed;
        this.id = $stateParams.id;
        this.accidents = Closed.query(res => {
            if (this.id) this.editable = res.find(e => e.crash_id == this.id);
            else $state.go('closed', {id: res[0].crash_id});
        }, error => {
            console.log(error);
        });

        this.uploader = new FileUploader();

        this.uploader.onWhenAddingFileFailed = function(item /*{File|FileLikeObject}*/, filter, options) {
            console.info('onWhenAddingFileFailed', item, filter, options);
        };
        this.uploader.onAfterAddingFile = function(fileItem) {
            console.info('onAfterAddingFile', fileItem);
        };
        this.uploader.onAfterAddingAll = function(addedFileItems) {
            console.info('onAfterAddingAll', addedFileItems);
        };
        this.uploader.onBeforeUploadItem = function(item) {
            console.info('onBeforeUploadItem', item);
        };
        this.uploader.onProgressItem = function(fileItem, progress) {
            console.info('onProgressItem', fileItem, progress);
        };
        this.uploader.onProgressAll = function(progress) {
            console.info('onProgressAll', progress);
        };
        this.uploader.onSuccessItem = function(fileItem, response, status, headers) {
            console.info('onSuccessItem', fileItem, response, status, headers);
        };
        this.uploader.onErrorItem = function(fileItem, response, status, headers) {
            console.info('onErrorItem', fileItem, response, status, headers);
        };
        this.uploader.onCancelItem = function(fileItem, response, status, headers) {
            console.info('onCancelItem', fileItem, response, status, headers);
        };
        this.uploader.onCompleteItem = function(fileItem, response, status, headers) {
            console.info('onCompleteItem', fileItem, response, status, headers);
        };
        this.uploader.onCompleteAll = function() {
            console.info('onCompleteAll');
        };

        console.info('uploader', this.uploader);
    }
    editAccident() {
        this.Closed.update(this.editable, () => {
            alert('Данные об аварии обновлены');
        });
    }
}
