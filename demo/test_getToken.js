const lovearth = require('../lib')
async function test_getToken() {
    const dua = await lovearth({
        APP_KEY: "aHEVYhE1",
        APP_SECRET: "f34b127abc7cca1862dac91db6256190",
    })
    //--------------------------------------------------
    token = 'eyJhbGciOiJSUzI1NiIsImtpZCI6ImI1MGIxZWZmZGMwMzVlMjg2OWI2YzQ1ZjMzYmRmNWQ3In0.eyJpYXQiOjE1NTE3MDQzNTksIm5iZiI6MTU1MTcwNDM1OSwiZXhwIjoxNTUxNzA3OTU5LCJpc3MiOiJsb3ZlYXJ0aCIsImR1YSI6IlBQamdPcjdMIiwiZGlkIjoiR1BwdmFPVEIiLCJ1aWQiOiJhbm9ueW11cyIsImFpZCI6ImFIRVZZaEUxIiwiYXVkIjoiaHR0cDovL2FkbWluLnhkdWEuY29tIiwiaXAiOiIxNTkuMjI2LjQzLjYyIiwidWEiOiJheGlvcy8wLjE4LjAiLCJ1Z3JwIjoiWGRVYVhkdUEiLCJyb2xlIjoibm9uZSJ9.Z2N1_3Lbl0B3Aj2EjndlO9Z3gQJ0xqbdSQvV05lCotb8N2ul8Q0tr36UvfqUj73JFdWX97yLAchkSmagWP0K-ywg0ApPMSBvSKy9JQu58FvNRW-kFbJTmzTKqofIsgVXH8dZ3xmkass3NlTkpZ4n7I_3ihV1NzO6n0UBTPKkbkRDfKN2EGnjRAajwhIybsC9oYBty0pfivcrlLdVNEWPcK0AtPu56kHFVklr_S5Vn0AIl7SjtciroBWJWeSZv_StGsH0qwt3k9P8gEJFPpw4osfsDsqvjs3k-7qAojSHn64icqv2iK8puMQvDLE1URrL6jJip7UZN4i10eAZYr_Iog';    
    //token = 'eyJhbGciOiJSUzI1NiIsImtpZCI6ImI1MGIxZWZmZGMwMzVlMjg2OWI2YzQ1ZjMzYmRmNWQ3In0.eyJpYXQiOjE1NTE3NzczOTAsIm5iZiI6MTU1MTc3NzM5MCwiZXhwIjoxNTUxNzgwOTkwLCJpc3MiOiJMb3ZlYXJ0aCBEVUEgQVBJIFNlcnZpY2UiLCJhdWQiOiJMb3ZlYXJ0aCBJbmMiLCJkdWEiOiJsNEFSMXRVMCIsImRpZCI6IkdQcHZhT1RCIiwidWlkIjoiRHQ1bXZydFUiLCJhaWQiOiJhSEVWWWhFMSJ9.BJ0c-2FTLSDtbo45reAXd-XCptyW9h9J2V-tJ46Zhh59RK09L-aWop_gIH5NUbwwbtlmOIWb1VvMlae4hN0bEZ1WChfNVx4NiqOYew2qZvME8w0rfVRQAA-naUuNm7YvxRu3kjuVrKJibfi_PnwaK30GBlci8s_6Q3UTks-2LMKRaIfHuM_268sWJ_sRgb7Y3yCb2N1sGA7a_mFofJt9JvBfX0F-8lcBovS8s5vExoOn9rS1kVr9U48U-WcMZwcHJ0y61alOhOmL_y-z7YJv0oe7HBRuAHvZ_e4xlMu1qBVC3JDZhtmhwD2F4S_MiwhbC9x9OLvqipOYsfqatXdfBQ'
    token = 'eyJhbGciOiJSUzI1NiIsImtpZCI6ImI1MGIxZWZmZGMwMzVlMjg2OWI2YzQ1ZjMzYmRmNWQ3In0.eyJpYXQiOjE1NTE3OTgwODYsIm5iZiI6MTU1MTc5ODA4NiwiZXhwIjoxNTUxODAxNjg2LCJpc3MiOiJMb3ZlYXJ0aCBEVUEgQVBJIFNlcnZpY2UiLCJhdWQiOiJodHRwOi8vYWRtaW4ueGR1YS5jb20iLCJkdWEiOiJsNEFSMXRVMCIsImRpZCI6IkdQcHZhT1RCIiwidWlkIjoiRHQ1bXZydFUiLCJhaWQiOiJhSEVWWWhFMSIsImlwIjoiMTU5LjIyNi40My42MiIsInVhIjoiYXhpb3MvMC4xOC4wIiwidWdycCI6IlhkVWFYZHVBIiwicm9sZSI6Im5vbmUsZ29kLG5vbmUscm9vdCJ9.qDk9OluT3aqfCVUfkAIVqF9hQCHZtLo98Zm0uocc54JiuUDjiCk0TU_bNtxpiiTDzC8rqBWLkhSCOeEd-3lPEHKIL8U78U8sEEcunJsaca36R1SlljsHk6khpeyY36S3OHYaZWNdMbVDP8sMBO0jUCLkb7JuijXS8wJQtnYP7cGlIaJGFQlI-eFVL2bW8ExYZDRg7zaixlLn51ZxiH3Zf-vPcXHuNilW0YVNp1pS7I9XOHXDC0nyzi0Q7-GxD0KzUto9JBPKRWKbWpIRM6nsSU0eYsieDBPUmP6g-j81_gzkPku_soYpF6xnruiC-3KJFoybTr0Y5HMcEKakBtnnYw'
    token = 'eyJhbGciOiJSUzI1NiIsImtpZCI6ImI1MGIxZWZmZGMwMzVlMjg2OWI2YzQ1ZjMzYmRmNWQ3In0.eyJpYXQiOjE1NTE3OTgyMjUsIm5iZiI6MTU1MTc5ODIyNSwiZXhwIjoxNTUxODAxODI1LCJpc3MiOiJsb3ZlYXJ0aCIsImR1YSI6Imw0QVIxdFUwIiwiZGlkIjoiR1BwdmFPVEIiLCJ1aWQiOiJEdDVtdnJ0VSIsImFpZCI6ImFIRVZZaEUxIiwiYXVkIjoiaHR0cDovL2FkbWluLnhkdWEuY29tIiwiaXAiOiIxNTkuMjI2LjQzLjYyIiwidWEiOiJheGlvcy8wLjE4LjAiLCJ1Z3JwIjoiWGRVYVhkdUEiLCJyb2xlIjoibm9uZSxnb2Qsbm9uZSxyb290In0.UH7ztdzQ_7hVX06a7ovxOPPKLDb0Asl_xOAeRV8Y0ZYpdTmfbpSIifu-BXESJeodkB_HQ-YNNIqswH19Ge7CFo0yOh5KboWysNNte6kFmIGeVTLKf4MPfo3M7pfpWwZQDUqy1kaymkZ8ryXgLfevc1DDQ_gtdVXXO8cKGf1EyefV0Iy-z4X1lRdw-XdT0OR2l_i57nBzv2eEdo8qO0jiYNO8FktEF_xCRbqbdpD_7ENiBnCgmTj052Wu8P__N2eHcRu_ySEpulB2X7M_ebUZN88UrB-HGczuXUs9eBC6To1B0wKzhs2cyAoEWM2otFLqXWpfDP12_HaR8x1uXW1W1g'
    token = 'eyJhbGciOiJSUzI1NiIsImtpZCI6ImI1MGIxZWZmZGMwMzVlMjg2OWI2YzQ1ZjMzYmRmNWQ3In0.eyJpYXQiOjE1NTE3OTg1NjEsIm5iZiI6MTU1MTc5ODU2MSwiZXhwIjoxNTUxODAyMTYxLCJpc3MiOiJsb3ZlYXJ0aCIsImR1YSI6Imw0QVIxdFUwIiwiZGlkIjoiR1BwdmFPVEIiLCJ1aWQiOiJEdDVtdnJ0VSIsImFpZCI6ImFIRVZZaEUxIiwiYXVkIjoiaHR0cDovL2FkbWluLnhkdWEuY29tIiwiaXAiOiIxNTkuMjI2LjQzLjYyIiwidWEiOiJheGlvcy8wLjE4LjAiLCJ1Z3JwIjoiWGRVYVhkdUEiLCJyb2xlIjoiZ29kLG5vbmUscm9vdCJ9.OJdyKsYMJrUDdnOagFgeFkCZuE4_mpD3ZFud3uF4ofihtrlwOsYCtT73cG7HiYzDQUH-tpoVWNXfZbqlfeDcwiGpksBEkMlBjD8ha8VgnGInUMmcT5gbOadF_nXwumt72xqUs6gr5iWGWWsrUokh1MJnsIehf5Ct4uwjsOLxwf4IydKAfj7yrtliORElzCdVpENhiQN6F5dQ0oW_09tpkgeJfiW6U6r7gsYYdeyFqBlG7pMcvb-WV5FB8eQI--WJ3WH5fMtE7lXHqb1eUE93G3YU3kalNUb8e4aCyyL0W44nKyGcEltdMrtnBIYmwWotqCDb6zeZPMsXeTrTFFsxjw'
    api_name = "验证令牌";
    res = await dua.getToken(token)
    if(res.error == 0){
        console.log(api_name+"成功 ");
    }else{
        console.log(api_name+"失败 "+res.reason);
    }
    console.log(res);
}
test_getToken();
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
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
