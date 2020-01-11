const lovearth = require('../lib')


async function test_addUser() {
    const dua = await lovearth({
        APP_TOKEN:"eyJhbGciOiJSUzI1NiIsImtpZCI6ImI1MGIxZWZmZGMwMzVlMjg2OWI2YzQ1ZjMzYmRmNWQ3In0.eyJpYXQiOjE1NzE1NDg2NDYsIm5iZiI6MTU3MTU0ODY0NiwiaXNzIjoieGR1YS5jb20iLCJleHAiOjE4ODY5MDg2NDYsImF1ZCI6ImFIRVZZaEUxIiwic3ViIjoiQW5vTnltdVMiLCJqdGkiOiIxMjM0NTY3OCIsImNpcCI6IjE1OS4yMjYuMzkuMSIsImN1YSI6IkNhQ2xpZW50VWEiLCJkZXYiOiJVbml2ZXJzYWwiLCJvd24iOiJEdDVtdnJ0VSJ9.oIWr9ozhMgHQ7306p00B9RuBEw2tJrgZtZwHE0d6EC5L98Q7AhzCPMgJiVbyd0gYqgW4heWm1m1SJQcjq3G_x9OCq7B3EPFHJ99csT-vBYrXmuX2VszkY5IaxY_9UOJiiXTTvX69vNEg1yXjqvfuSb9sduyj33XqM3M371h7jpqqdVHzRMZq7C2gIsWdVEo1FW0zC9P20jwnkw6KNPxOz9qGxgk6D3itqRZ1_Fb9wQVBhgcChk0uHyIuhs84dn2tgLN4no_GkxvJdbJmNMwhjN7Z0wp0lcJwl-lAckg7hk-FjroPZwUBO2iEOByxfl88cmcuGyx1bZPWLQSp66mMJQ",
    })
    const res_login = await dua.login({
        by  :   "tel",
        ustr:   '+86-15810419011',
        pwd :   'a906449d5769fa7361d7ecc6aa3f6d28',
        shop:   "EldrCaRE",
        role:   "none"
    })
    console.log(res_login);
    
    api_name = "企业创建";
    add_corp_param={
        name      : "中国科学院计算技术研究所临沂分所",
	    code      : "12371300MB28517732",
    }
    
    add_corp_param={
        name      : "中国科学院计算技术研究所苏州分所",
	    code      : "12320500MB1506011N",
        brief     : "开展人工智能及大数据应用技术研究,推动区域产业转型与升级人工智能研究无线通信研究大数据研究生物信息研究专业培训学术交流人才培养高技术企业引入和孵化",
    }

    add_corp_param={
        name      : "中国科学院计算技术研究所济宁分所",
	    code      : "12370811054960525P",
        brief     : "以物联网、云计算等核心技术为基础推进智慧城市、两化融合及新一代信息技术产业化集群发展;解决行业共性关键技术难题,形成核心技术和产品;高技术企业引入和孵化;争取国家级重大科研及产业化项目;培养云计算、物联网人才,培育信息领域人才团队。",
    }

    add_corp_param={
        name      : "中国科学院计算技术研究所宁波分所",
	    code      : "123302005994874081",
        brief     : "支撑和引领宁波新一代信息技术和海洋高技术战略性新兴产业发展,支撑宁波智慧城市建设。承担宁波市新一代信息技术产业及海洋高技术产业公共服务平台建设任务;整合中国科学院计算技术研究所及中科院所属相关院所在新一代信息技术和智慧海洋领域的人才、科技资源,组织开展面向应用的以智能感知为核心的新一代信息技术研究开发以及技术组装;承担国家及地方相关科研任务;面向地方产业进行技术扩散和技术转移,构筑产学研平台。",
    }


    res = await dua.addCorp(add_corp_param)
    console.log(res);
    if(res.error == 0){
        console.log(api_name+"成功");
    }else{
        console.log(api_name+"失败 "+res.reason);
    }
}

test_addUser();
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
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
