import AV from 'leancloud-storage'

const APP_ID = 'WtNEuW5BqSPPktd71ETCEzH6-gzGzoHsz'
const APP_KEY = 'htE8r3UXYvz3xDNbhklWux6n'
AV.init({
    appId: APP_ID,
    appKey: APP_KEY
})

export default AV;

export const TodoModel = {
    getByUser(user, successFn, errorFn) {
        let query = new AV.Query('Todo')
        query.find().then((response) => {
            let array = response.map((t) => {
                return {id: t.id, ...t.attributes}
            })
            successFn.call(null, array)
        }, (error) => {
            errorFn && errorFn.call(null, error)
        })
    },
    create({content, isDone}, successFn, errorFn) {
        let Todo = AV.Object.extend('Todo');//Todo表
        // 新建对象
        let todo = new Todo();
        // 设置名称
        todo.set('content', content);
        // 设置优先级
        todo.set('isDone', isDone);

        let acl = new AV.ACL()
        acl.setPublicReadAccess(false)
        acl.setWriteAccess(AV.User.current(), true)
        acl.setReadAccess(AV.User.current(),true)
        todo.setACL(acl)

        todo.save().then((response) => {
            successFn.call(null, response.id)
        }, (error) => {
            errorFn && errorFn.call(null, error)
        });
    },
    update({id, isDone}, successFn, errorFn) {
        let todo = AV.Object.createWithoutData('Todo', id);
        todo.set('isDone', isDone)
        todo.save().then((response) => {
            successFn && successFn.call(null)
        }, (error) => {
            errorFn && errorFn.call(null, error)
        })
    },
    destroy(todoId, successFn, errorFn) {
        let todo = AV.Object.createWithoutData('Todo', todoId)
        todo.destroy().then((response) => {
            successFn && successFn.call(null)
        }, (error) => {
            errorFn && errorFn.call(null, error)
        })
    }
}

export function signUp(email, username, password, successFn, errorFn) {
    let user = new AV.User();
    user.setUsername(username);
    user.setPassword(password);
    user.setEmail(email);
    user.signUp().then((loginedUser) => {
        let user = getUserFromAVUser(loginedUser)
        successFn.call(null, user)
    }, (error) => {
        errorFn.call(null, error)
    })
}

export function logIn(username, password, successFn, errorFn) {
    AV.User.logIn(username, password).then((loginedUser) => {
        let user = getUserFromAVUser(loginedUser);
        successFn.call(null, user)
    }, (error) => {
        errorFn.call(null, error)
    })
}

export function logOut() {
    AV.User.logOut()
}

function getUserFromAVUser(AVUser) {
    return {
        id: AVUser.id,
        ...AVUser.attributes
    }
}

export function getCurrentUser() {
    let user = AV.User.current()
    if (user) {
        return getUserFromAVUser(user)
    } else {
        return null
    }
}

export function resetPassword(email) {
    AV.User.requestPasswordReset(email).then((result) => {
        console.log(result)
    }, (error) => {
        console.log(error)
    })
}