const config = {
  baseUrl: 'https://nomoreparties.co/v1/wff-cohort-21',
  headers: {
    authorization: '210046f4-4d16-4529-98c3-3d29d6af6c6d',
    'Content-Type': 'application/json'
  }
}

export const getUserInfo = () => {
  return  fetch(config.baseUrl + '/users/me', {
    method: 'GET',
    headers: config.headers,
  })   
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .catch((err) => {
      console.log(err);
    });
}

export const getInitialCards = () => {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers
  })
    .then(res => {
      if (res.ok) {
        return res.json();
      }

      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .catch((err) => {
      console.log(err);
    });
} 

export const EditUserInfo = (nameData, descriptionData) => {
  return  fetch(config.baseUrl + '/users/me', {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      name: nameData,
      about: descriptionData
    })
  })   
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .catch((err) => {
      console.log(err);
    });
}

export const editAvatar = (link) => {
  return  fetch(config.baseUrl + '/users/me/avatar', {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      avatar: link
    })
  })   
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .catch((err) => {
      console.log(err);
    });
}

export const addNewCard = (name, link) => {
  return fetch(`${config.baseUrl}/cards`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({
      name: name,
      link: link
    })
  })
    .then(res => {
      if (res.ok) {
        return res.json();
      }

      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .catch((err) => {
      console.log(err);
    });
}


export const handleDeleteCard = (card) => {
  return fetch(config.baseUrl + `/cards/${card._id}`, {
    method: 'DELETE',
    headers: config.headers,
  })
    .then(res => {
      if (res.ok) {
        return res.json();
      }

      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .catch((err) => {
      console.log(err);
    });
}

export function renderLoading(isLoading, form) {
  const button = form.querySelector("button")

  if (isLoading) {
    button.textContent = 'Сохранение...'
  } else {
     button.textContent = 'Сохранить'
  }
}

export const handleLikeCard = (card) => {
  return fetch(config.baseUrl + `/cards/likes/${card._id}`, {
    method: 'PUT',
    headers: config.headers,
  })
    .then(res => {
      if (res.ok) {
        return res.json();
      } 
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .catch((err) => {
      console.log(err);
    });
}

export const handleDislikeCard = (card) => {
  return fetch(config.baseUrl + `/cards/likes/${card._id}`, {
    method: 'DELETE',
    headers: config.headers,
  })
    .then(res => {
      if (res.ok) {
        return res.json();
      }  
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .catch((err) => {
      console.log(err);
    });
}

export const getLikes = (card) => {
  return fetch(config.baseUrl + `/cards/${card._id}`, {
    method: 'GET',
    headers: config.headers,
  })
    .then(res => {
      if (res.ok) {
        return res.json();
      }  
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .catch((err) => {
      console.log(err);
    });
}