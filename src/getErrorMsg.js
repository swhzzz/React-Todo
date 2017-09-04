const map = {
    202: '该用户名已存在',
    210: '账号与密码不一致',
    211: '用户不存在',
    217: '无效的用户名',
    unknown: '请求失败，请稍后再试'
};

export default function({code}){
    return map[code] || map['unknown']
}
