const api = (() => {
  const BASE_URL = 'https://forum-api.dicoding.dev/v1'

  function getAccessToken () {
    return localStorage.getItem('accessToken')
  }

  function putAccessToken (accessToken) {
    return localStorage.setItem('accessToken', accessToken)
  }

  async function fetchWithToken (url, options = {}) {
    return fetch(url, {
      ...options,
      headers: {
        ...options.headers,
        Authorization: `Bearer ${getAccessToken()}`
      }
    })
  }

  async function getOwnProfile () {
    const response = await fetchWithToken(`${BASE_URL}/users/me`)
    const responseJson = await response.json()

    if (responseJson.status !== 'success') {
      return { error: true, data: null }
    }

    return { error: false, data: responseJson.data.user }
  }

  async function getUsers () {
    const response = await fetch(`${BASE_URL}/users`)
    const responseJson = await response.json()

    if (responseJson.status !== 'success') {
      return {
        error: true,
        data: null
      }
    }

    return {
      error: false,
      data: responseJson.data.users
    }
  }

  async function getLeaderboard () {
    const response = await fetch(`${BASE_URL}/leaderboards`)
    const responseJson = await response.json()

    if (responseJson.status !== 'success') {
      return {
        error: true,
        data: null
      }
    }

    return {
      error: false,
      data: responseJson.data.leaderboards
    }
  }

  async function getThreads () {
    const response = await fetch(`${BASE_URL}/threads`)
    const responseJson = await response.json()

    if (responseJson.status !== 'success') {
      return { error: true, data: null }
    }

    return { error: false, data: responseJson.data.threads }
  }

  async function getThreadDetail (id) {
    const response = await fetchWithToken(`${BASE_URL}/threads/${id}`)
    const responseJson = await response.json()

    if (responseJson.status !== 'success') {
      return { error: true, data: null }
    }

    return { error: false, data: responseJson.data.detailThread }
  }

  async function login ({ email, password }) {
    const response = await fetch(`${BASE_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    })

    const responseJson = await response.json()

    if (responseJson.status !== 'success') {
      alert(responseJson.message)
      return { error: true, data: null }
    }

    return { error: false, data: responseJson.data }
  }

  async function register (name, email, password) {
    const response = await fetch(`${BASE_URL}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name, email, password })
    })

    const responseJson = await response.json()

    if (responseJson.status !== 'success') {
      alert(responseJson.message)
      return { error: true }
    }

    return { error: false }
  }

  async function createThread ({ title, body, category }) {
    const response = await fetchWithToken(`${BASE_URL}/threads`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'

      },
      body: JSON.stringify({ title, body, category })
    })

    const responseJson = await response.json()

    if (responseJson.status !== 'success') {
      return {
        error: true,
        data: null
      }
    }

    return {
      error: false,
      data: responseJson.data
    }
  }

  async function upVote (threadId) {
    const response = await fetchWithToken(`${BASE_URL}/threads/${threadId}/up-vote`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    })

    const responseJson = await response.json()

    if (responseJson.status !== 'success') {
      return {
        error: true,
        data: null
      }
    }

    return {
      error: false,
      data: responseJson.data
    }
  }

  async function downVote (threadId) {
    const response = await fetchWithToken(`${BASE_URL}/threads/${threadId}/down-vote`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    })

    const responseJson = await response.json()

    if (responseJson.status !== 'success') {
      return {
        error: true,
        data: null
      }
    }

    return {
      error: false,
      data: responseJson.data
    }
  }

  async function upVoteComment (threadId, commentId) {
    const response = await fetchWithToken(`${BASE_URL}/threads/${threadId}/comments/${commentId}/up-vote`, {

      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    })

    const responseJson = await response.json()

    if (responseJson.status !== 'success') {
      return {
        error: true,
        data: null
      }
    }

    return {
      error: false,
      data: responseJson.data
    }
  }

  async function downVoteComment (threadId, commentId) {
    const response = await fetchWithToken(`${BASE_URL}/threads/${threadId}/comments/${commentId}/down-vote`, {

      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    })

    const responseJson = await response.json()

    if (responseJson.status !== 'success') {
      return {
        error: true,
        data: null
      }
    }

    return {
      error: false,
      data: responseJson.data
    }
  }

  async function createComment (threadId, content) {
    const response = await fetchWithToken(`${BASE_URL}/threads/${threadId}/comments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ content })
    })

    const responseJson = await response.json()

    if (responseJson.status !== 'success') {
      return {
        error: true,
        data: null
      }
    }

    return {
      error: false,
      data: responseJson.data
    }
  }

  return {
    getAccessToken,
    putAccessToken,
    fetchWithToken,
    getOwnProfile,
    getUsers,
    getLeaderboard,
    getThreads,
    getThreadDetail,
    login,
    register,
    createThread,
    upVote,
    downVote,
    createComment,
    upVoteComment,
    downVoteComment
  }
})()

export default api

// async function getUserLogged() {
//     const response = await fetchWithToken(`${BASE_URL}/users/me`);
//     const responseJson = await response.json();

//     if (responseJson.status !== 'success') {
//         return { error: true, data: null };
//     }

//     return { error: false, data: responseJson.data };
// }

// async function getThread(id) {
//     const response = await fetchWithToken(`${BASE_URL}/threads/${id}`);
//     const responseJson = await response.json();

//     if (responseJson.status !== 'success') {
//         return { error: true, data: null };
//     }

//     return { error: false, data: responseJson.data };
// }

// async function showUsers() {
//     const response = await fetch(`${BASE_URL}/users`);
//     const responseJson = await response.json();

//     if (responseJson.status !== "success") {
//         return {
//             error: true,
//             data: null,
//         };
//     }

//     return {
//         error: false,
//         data: responseJson.data,
//     };
// }

// async function login({ email, password }) {
//     const response = await fetch(`${BASE_URL}/login`, {
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ email, password }),
//     });

//     const responseJson = await response.json();

//     if (responseJson.status !== "success") {
//         alert(responseJson.message);
//         return { error: true, data: null };
//     }

//     return { error: false, data: responseJson.data };
// }

// async function register({ name, email, password }) {
//     const response = await fetch(`${BASE_URL}/register`, {
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ name, email, password }),
//     });

//     const responseJson = await response.json();

//     if (responseJson.status !== "success") {
//         alert(responseJson.message);
//         return { error: true };
//     }

//     return { error: false };
// }

// async function createThread({ title, body, category }) {
//     const accessToken = getAccessToken();
//     const response = await fetchWithToken(`${BASE_URL}/threads`, {
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${accessToken}`,
//         },
//         body: JSON.stringify({ title, body, category }),
//     });

//     const responseJson = await response.json();

//     if (responseJson.status !== "success") {
//         return {
//             error: true,
//             data: null,
//         };
//     }

//     return {
//         error: false,
//         data: responseJson.data,
//     };
// }

// async function createComment(threadId, content) {
//     const accessToken = getAccessToken();
//     const response = await fetchWithToken(`${BASE_URL}/threads/${threadId}/comments`, {
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${accessToken}`,
//         },
//         body: JSON.stringify({ content }),
//     });

//     const responseJson = await response.json();

//     if (responseJson.status !== "success") {
//         return {
//             error: true,
//             data: null,
//         };
//     }

//     return {
//         error: false,
//         data: responseJson.data,
//     };
// }

// async function upVote(threadId) {
//     const accessToken = getAccessToken();
//     const response = await fetchWithToken(`${BASE_URL}/threads/${threadId}/up-vote`, {
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${accessToken}`,
//         },
//     });

//     const responseJson = await response.json();

//     if (responseJson.status !== "success") {
//         return {
//             error: true,
//             data: null,
//         };
//     }

//     return {
//         error: false,
//         data: responseJson.data,
//     };
// }

// export {
//     getAccessToken,
//     putAccessToken,
//     showLeaderboard,
//     showUsers,
//     getUserLogged,
//     login,
//     getThread,
//     register,
//     showThreads,
//     createThread,
//     createComment,
//     upVote,
// };
