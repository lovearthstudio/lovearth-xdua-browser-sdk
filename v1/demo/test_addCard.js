const lovearth = require('../lib')


async function test_addidcard() {
    const dua = await lovearth({
        APP_TOKEN:"eyJhbGciOiJSUzI1NiIsImtpZCI6ImI1MGIxZWZmZGMwMzVlMjg2OWI2YzQ1ZjMzYmRmNWQ3In0.eyJpYXQiOjE1NzE1NDg2NDYsIm5iZiI6MTU3MTU0ODY0NiwiaXNzIjoieGR1YS5jb20iLCJleHAiOjE4ODY5MDg2NDYsImF1ZCI6ImFIRVZZaEUxIiwic3ViIjoiQW5vTnltdVMiLCJqdGkiOiIxMjM0NTY3OCIsImNpcCI6IjE1OS4yMjYuMzkuMSIsImN1YSI6IkNhQ2xpZW50VWEiLCJkZXYiOiJVbml2ZXJzYWwiLCJvd24iOiJEdDVtdnJ0VSJ9.oIWr9ozhMgHQ7306p00B9RuBEw2tJrgZtZwHE0d6EC5L98Q7AhzCPMgJiVbyd0gYqgW4heWm1m1SJQcjq3G_x9OCq7B3EPFHJ99csT-vBYrXmuX2VszkY5IaxY_9UOJiiXTTvX69vNEg1yXjqvfuSb9sduyj33XqM3M371h7jpqqdVHzRMZq7C2gIsWdVEo1FW0zC9P20jwnkw6KNPxOz9qGxgk6D3itqRZ1_Fb9wQVBhgcChk0uHyIuhs84dn2tgLN4no_GkxvJdbJmNMwhjN7Z0wp0lcJwl-lAckg7hk-FjroPZwUBO2iEOByxfl88cmcuGyx1bZPWLQSp66mMJQ",
    })
    const res_login = await dua.login({
        by  :   "tel",
        ustr:   '+86-15810419011',
        pwd :   'a906449d5769fa7361d7ecc6aa3f6d28',
        shop:   "0EvpoxJ3",// 中国科学院计算技术研究所济南分所 这家企业的官方店铺
        role:   "lord"      // 以CEO身份登录
    })
    
    console.log(JSON.stringify(res_login));
    //来源,通缉犯网站: http://www.zhuatongji.com/gawtjfmd/89262.html 
    api_name = "老人创建";
    add_idcard_param={
        id    : "371422196603104039",
        name      : "卢洪河",
	    addr  : "天津市津南区双桥河镇小营盘村二区4排6号",
        nation    : "回族",
    }
    add_idcard_param={
        id    : "342128196203036214",
        name      : "陈新华",
	    addr  : "安徽省颍上县江口镇孙庄村汤庄队自然庄24号",
        nation    : "汉族",
    }

    add_idcard_param={
        id    : "440232196309230017",
        name      : "邓喜潮",
	    addr  : "广东省韶关市乳源瑶族自治县乳城镇解放南路下街7号",
        nation    : "汉族",
    }

    add_idcard_param={
        id    : "33062419640823663X",
        name      : "袁灿裕",
	    addr  : "浙江省新昌县大市聚镇西山村新庄50号",
        nation    : "汉族",
    }

    add_idcard_param={
        id    : "321119195008222825",
        name      : "王网",
	    addr  : "江苏省丹阳市珥陵镇居民点二弄5号",
        nation    : "汉族",
    }

    add_idcard_param={
        id    : "372822196408175416",
        name      : "张金山",
	    addr  : "山东省临沂市郯城县红花乡红花埠西中村82号",
        nation    : "汉族",
    }

    add_idcard_param={
        id    : "510723196503271276",
        name      : "任治模",
	    addr  : "四川省盐亭县高灯镇龙盘村7组",
        nation    : "汉族",
    }

    add_idcard_param={
        id    : "412328196611082454",
        name      : "庄克华",
	    addr  : "河南省永城市蒋口乡陈楼村前东组096号",
        nation    : "汉族",
    }

    add_idcard_param={
        id    : "330124196309031041",
        name      : "马荷英",
	    addr  : "浙江省杭州市临安区锦城街道横街村25组小山头51号",
        nation    : "汉族",
    }

    add_idcard_param={
        id    : "362424196603216411",
        name      : "李国平",
	    addr  : "江西省新干县金川镇中山路13号301室",
        nation    : "汉族",
    }

    add_idcard_param={
        id    : "530103199510040416",
        name      : "李金峰",
	    addr  : "云南省昆明市官渡区锦苑花园25幢2单元502号",
        nation    : "回族",
        issuer:  "昆明市公安局官渡分局",
    }

    add_idcard_param={
        id    : "21110219940426001X",
        name      : "毕宗哲",
	    addr  : "辽宁省盘锦市双台子区胜利街道永安社区42区20号",
        nation    : "汉族",
    }

    add_idcard_param={
        id    : "352624197503164611",
        name      : "刘文华",
	    addr  : "福建省上杭县蓝溪镇冯石村石门里路19号",
        nation    : "汉族",
    }

    add_idcard_param={
        id    : "220822197305240019",
        name      : "王士平",
	    addr  : "吉林省通榆县开通镇富强街十委五组",
        nation    : "汉族",
    }

    add_idcard_param={
        id    : "452628198612042713",
        name      : "刘祥安",
	    addr  : "广西壮族自治区凌云县玉洪瑶族乡上谋村大坪屯21号",
        nation    : "汉族",
    }

    res = await dua.addIdcard(add_idcard_param)
    console.log(res);
    if(res.error == 0){
        console.log(api_name+"成功");
    }else{
        console.log(api_name+"失败 "+res.reason);
    }
}

test_addidcard();
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    // dua.initialize().then(() => {
//   dua.login({
//     username: username,
//     password: password,
//   }).then(res => {
//     console.log(res)
//   }).catch(err => {
//     console.log(err)
//   })
// })
