<<<<<<< HEAD
export const apiUrl = 'http://localhost:5000';

export const GET = (url, success, fail) => {
  fetch(apiUrl + url, {mode: 'cors'}).then((response) => {
    if (response.ok) {
      return response.json();
    }
    throw new Error(`网络请求失败，请稍后再试或咨询管理员。(${response.statusText})`);
  }).then((json) => {
    if (json.result === 'success') {
      success(json);
    } else {
      throw new Error('非法请求。');
    }
  }).catch((errInfo) => fail(errInfo.message));
};

export const POST = (url, payload, success, fail) => {
  fetch(apiUrl + url, {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: new Headers({
        'Content-Type': 'application/json'
      }),
      mode: 'cors',
    }).then((response) => {
    if (response.ok) {
      return response.json();
    }
    throw new Error(`网络请求失败，请稍后再试或咨询管理员。(${response.statusText})`);
  }).then((json) => {
    if (json.result === 'success') {
      success(json);
    } else if (json.result === 'error') {
      fail(json.errMsg);
    } else {
      throw new Error('非法请求。');
    }
  }).catch((errInfo) => fail(errInfo.message));
};
=======
export const apiUrl = 'http://localhost:5000';

export const GET = (url, success, fail) => {
  fetch(apiUrl + url, {mode: 'cors'}).then((response) => {
    if (response.ok) {
      return response.json();
    }
    throw new Error(`网络请求失败 (${response.statusText})`);
  }).then((json) => {
    console.log(json);
    if (json.result === 'success') {
      success(json);
    } else {
      fail(json.errMsg);
    }
  }).catch((errInfo) => fail(errInfo.message));
};

export const POST = (url, payload, success, fail) => {
  fetch(apiUrl + url, {
    method: 'POST',
    body: JSON.stringify(payload),
    headers: new Headers({
      'Content-Type': 'application/json'
    }),
    mode: 'cors',
  }).then((response) => {
    if (response.ok) {
      return response.json();
    }
    throw new Error(`网络请求失败 (${response.statusText})`);
  }).then((json) => {
    console.log(json);
    if (json.result === 'success') {
      success(json);
    } else if (json.result === 'fail') {
      fail(json.errMsg);
    } else {
      throw new Error('非法请求。');
    }
  }).catch((errInfo) => fail(errInfo.message));
};
>>>>>>> 04e82073b0f4e53cdb947c45d27efa10f4a27117
