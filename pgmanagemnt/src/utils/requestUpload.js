import 'whatwg-fetch';
import 'isomorphic-fetch';

export function upload1(url, fileFormData, uploadActions) {
  const {
    onUploadStart, onUploadProgress, onUploadSuccess,
    onUploadError, onUploadAbort, onUploadEnd,
  } = uploadActions;

  let xhr;
  const newFile = fileFormData.get('file');
  const absolutePath = newFile && `${fileFormData.get('parent-path')}/${newFile.name}`;
  const promise = new Promise(((resolve) => {
    xhr = new XMLHttpRequest();
    if (xhr.upload) {
      // Fetch start event listener - when upload starts
      xhr.upload.addEventListener('loadstart', () => {
        if (onUploadStart) {
          onUploadStart();
        }
      });

      // Progress event listener
      if (xhr.upload && onUploadProgress) {
        xhr.upload.addEventListener('progress', (event) => {
          if (event.lengthComputable) {
            const uploadPercentage = (event.loaded / event.total) * 100;
            onUploadProgress(Math.floor(uploadPercentage), absolutePath);
          }
        });
      }

      // Successful upload event listener - invoked once the upload is completed successfully.
      xhr.addEventListener('load', () => {
        try {
          const response = JSON.parse(xhr.response);
          if (response && xhr.status === 200) {
            const result = response.result;
            if (onUploadSuccess) {
              onUploadSuccess(result);
            }
            resolve(result);
          } else if (response) {
            handleUploadError({
              errorMessage: response.result || xhr.statusText,
              onUploadError,
              absolutePath,
            });
          }
        } catch (e) {
          console.error(e);
          handleUploadError({
            errorMessage: xhr.statusText || 'error in upload',
            onUploadError,
            absolutePath,
          });
        }
      });

      // Abort event listener - upload abort by user
      xhr.addEventListener('abort', () => {
        if (onUploadAbort) {
          store.dispatch(onUploadAbort(absolutePath));
        }
      });

      // Error event listener - end of upload due to error
      xhr.addEventListener('error', () => {
        handleUploadError({
          errorMessage: xhr.statusText,
          onUploadError,
        });
      });

      // Upload completion listener - Invoked on either success/error/abort
      xhr.addEventListener('loadend', () => {
        if (onUploadEnd) {
          onUploadEnd();
        }
      });

      xhr.open('POST', url, true);
      xhr.setRequestHeader('Authorization', localStorage.getItem('authorization'));
      xhr.send(fileFormData);
    }
  }));

  promise[CANCEL] = () => xhr && xhr.abort();
  return promise;
}
