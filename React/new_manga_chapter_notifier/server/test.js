const axios = require('axios');

let config = {
  method: 'get',
  maxBodyLength: Infinity,
  url: 'https://api.myanimelist.net/v2/users/@me/animelist?fields=list_status&limit=4',
  headers: { 
    'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6ImRhNzVhNjNhNWY2NzNkOGRmMDhhOGM1OTc0NTg5Yzk1YmE5OWUzMDY2ZTc3YmYwYTFlY2Y1ZThmZWU0NzViZWJkZWUzNTVlZmM0NzMwZjRjIn0.eyJhdWQiOiI4NWMyMGVmMWM4NzQ4M2EwNDQxMjI1Nzc1YzQyYzNiYSIsImp0aSI6ImRhNzVhNjNhNWY2NzNkOGRmMDhhOGM1OTc0NTg5Yzk1YmE5OWUzMDY2ZTc3YmYwYTFlY2Y1ZThmZWU0NzViZWJkZWUzNTVlZmM0NzMwZjRjIiwiaWF0IjoxNzMxMzUxMjU0LCJuYmYiOjE3MzEzNTEyNTQsImV4cCI6MTczMzk0MzI1NCwic3ViIjoiOTk2Mzg4OCIsInNjb3BlcyI6W119.kDFTeVV3fL2jZutXtqh6uoFwDpOirzfP7MF3-GYZ6b2WHhqwpwLEbro_XeDcUQ6F2b0Ll-Kqp6fz0ZeCHvuqc1rP0l7zF1e0LDSHDdw_gpNVlNNWdp_PY7y4XgxOGr5SOwHsDi2VXmei-kX3gyTirYkoelkiTslV1skrcFxuE1YXjClR8yMaKsq4xBNDrZbrgEOXubafHDO5Ooer4T6He9L3yb6XuusLH0pcc-3EDPGHi34dLGkkFXZ80ZE34V5R-CYxt61i0BLQTpyurj9ZY7K2dGh1thxrWD_UKtQFKuPHduJ71K8OWUAkv_msxb3HowvsGYK5MKBnDNS4BQIlQQ'
  }
};

axios.request(config)
.then((response) => {
  console.log(JSON.stringify(response.data));
})
.catch((error) => {
  console.log(error);
});
