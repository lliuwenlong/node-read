define({ "api": [
  {
    "type": "post",
    "url": "/api/curriculum/addOrUpdate",
    "title": "课程添加修改",
    "name": "addOrUpdate",
    "group": "Curriculum",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "id",
            "description": "<p>Id</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "type_id",
            "description": "<p>分类Id</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "title",
            "description": "<p>标题</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "subtitle",
            "description": "<p>副标题</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "content",
            "description": "<p>内容</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "price",
            "description": "<p>价格</p>"
          }
        ]
      }
    },
    "description": "<p>课程添加修改</p>",
    "sampleRequest": [
      {
        "url": "/api/curriculum/addOrUpdate"
      }
    ],
    "version": "0.0.0",
    "filename": "src/api/controller/curriculum.ts",
    "groupTitle": "Curriculum"
  },
  {
    "type": "post",
    "url": "/api/curriculum/del",
    "title": "课程删除",
    "name": "del",
    "group": "Curriculum",
    "description": "<p>课程删除</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "id",
            "description": "<p>Id</p>"
          }
        ]
      }
    },
    "sampleRequest": [
      {
        "url": "/api/curriculum/del"
      }
    ],
    "version": "0.0.0",
    "filename": "src/api/controller/curriculum.ts",
    "groupTitle": "Curriculum"
  },
  {
    "type": "post",
    "url": "/api/curriculum/getList",
    "title": "课程获取",
    "name": "getList",
    "group": "Curriculum",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "type_id",
            "description": "<p>分类Id</p>"
          }
        ]
      }
    },
    "description": "<p>课程获取</p>",
    "sampleRequest": [
      {
        "url": "/api/curriculum/getList"
      }
    ],
    "version": "0.0.0",
    "filename": "src/api/controller/curriculum.ts",
    "groupTitle": "Curriculum"
  },
  {
    "type": "post",
    "url": "/api/system/delcurriculumType",
    "title": "首页分类删除",
    "name": "delcurriculumType",
    "group": "System",
    "description": "<p>首页分类删除</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "id",
            "description": "<p>Id</p>"
          }
        ]
      }
    },
    "sampleRequest": [
      {
        "url": "/api/system/delcurriculumType"
      }
    ],
    "version": "0.0.0",
    "filename": "src/api/controller/system.ts",
    "groupTitle": "System"
  },
  {
    "type": "post",
    "url": "/api/system/getCurriculumType",
    "title": "首页分类获取",
    "name": "getCurriculumType",
    "group": "System",
    "description": "<p>首页分类获取</p>",
    "sampleRequest": [
      {
        "url": "/api/system/getCurriculumType"
      }
    ],
    "version": "0.0.0",
    "filename": "src/api/controller/system.ts",
    "groupTitle": "System"
  },
  {
    "type": "post",
    "url": "/api/system/updateCurriculumType",
    "title": "首页分类添加修改",
    "name": "updateCurriculumType",
    "group": "System",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "id",
            "description": "<p>Id</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "name",
            "description": "<p>标题</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "sort",
            "description": "<p>排序</p>"
          }
        ]
      }
    },
    "description": "<p>首页分类添加修改</p>",
    "sampleRequest": [
      {
        "url": "/api/system/updateCurriculumType"
      }
    ],
    "version": "0.0.0",
    "filename": "src/api/controller/system.ts",
    "groupTitle": "System"
  },
  {
    "type": "post",
    "url": "/home/type/addType",
    "title": "添加数据",
    "name": "add",
    "group": "Type",
    "description": "<p>接口详细描述</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>添加类型名字</p>"
          }
        ]
      }
    },
    "sampleRequest": [
      {
        "url": "/home/type/addType"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>结果码</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>消息说明</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n     errno: 0,\n     errmsg: \"\",\n     data: [\n         {\n             name: \"娱乐\",\n             id: 1\n         }\n      ]\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/home/controller/type.ts",
    "groupTitle": "Type"
  },
  {
    "type": "post",
    "url": "/home/type/delType",
    "title": "数据删除",
    "name": "del",
    "group": "Type",
    "description": "<p>数据删除</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "id",
            "description": "<p>类型id</p>"
          }
        ]
      }
    },
    "sampleRequest": [
      {
        "url": "/home/type/delType"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>结果码</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>消息说明</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n     errno: 0,\n     errmsg: \"\",\n     data: null\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/home/controller/type.ts",
    "groupTitle": "Type"
  },
  {
    "type": "post",
    "url": "/home/type/modType",
    "title": "修改数据",
    "name": "mod",
    "group": "Type",
    "description": "<p>修改数据</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>类型名字</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "id",
            "description": "<p>类型id</p>"
          }
        ]
      }
    },
    "sampleRequest": [
      {
        "url": "/home/type/modType"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>结果码</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>消息说明</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n     errno: 0,\n     errmsg: \"\",\n     data: [\n         {\n             name: \"娱乐\",\n             id: 1\n         }\n      ]\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/home/controller/type.ts",
    "groupTitle": "Type"
  },
  {
    "type": "post",
    "url": "/home/type/getType",
    "title": "查询数据",
    "name": "query",
    "group": "Type",
    "description": "<p>查询数据</p>",
    "sampleRequest": [
      {
        "url": "/home/type/getType"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>结果码</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>消息说明</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n     errno: 0,\n     errmsg: \"\",\n     data: null\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/home/controller/type.ts",
    "groupTitle": "Type"
  },
  {
    "type": "post",
    "url": "/api/unicorn/addOrUpdate",
    "title": "独角兽添加修改",
    "name": "addOrUpdate",
    "group": "Unicorn",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "id",
            "description": "<p>Id</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "type_id",
            "description": "<p>项目类别</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "title",
            "description": "<p>标题</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "starttime",
            "description": "<p>开播时间</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "time",
            "description": "<p>项目时间</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "subtitle",
            "description": "<p>副标题</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "place",
            "description": "<p>地点</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "basic",
            "description": "<p>基本信息</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "details",
            "description": "<p>详细信息</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "about_info",
            "description": "<p>相关资讯</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "about_video",
            "description": "<p>相关视频</p>"
          },
          {
            "group": "Parameter",
            "type": "array",
            "optional": false,
            "field": "unicorn_tags",
            "description": "<p>标签Id</p>"
          },
          {
            "group": "Parameter",
            "type": "array",
            "optional": false,
            "field": "unicorn_info",
            "description": "<p>项目信息</p>"
          },
          {
            "group": "Parameter",
            "type": "array",
            "optional": false,
            "field": "unicorn_member",
            "description": "<p>成员</p>"
          }
        ],
        "unicorn_info": [
          {
            "group": "unicorn_info",
            "type": "string",
            "optional": false,
            "field": "name",
            "description": "<p>*轮</p>"
          },
          {
            "group": "unicorn_info",
            "type": "string",
            "optional": false,
            "field": "price",
            "description": "<p>金额（万）</p>"
          },
          {
            "group": "unicorn_info",
            "type": "string",
            "optional": false,
            "field": "valuation",
            "description": "<p>估值（万）</p>"
          },
          {
            "group": "unicorn_info",
            "type": "string",
            "optional": false,
            "field": "company",
            "description": "<p>投资公司</p>"
          }
        ],
        "unicorn_member": [
          {
            "group": "unicorn_member",
            "type": "string",
            "optional": false,
            "field": "name",
            "description": "<p>姓名</p>"
          },
          {
            "group": "unicorn_member",
            "type": "string",
            "optional": false,
            "field": "post",
            "description": "<p>职务</p>"
          },
          {
            "group": "unicorn_member",
            "type": "string",
            "optional": false,
            "field": "img",
            "description": "<p>头像</p>"
          }
        ]
      }
    },
    "description": "<p>独角兽添加修改</p>",
    "sampleRequest": [
      {
        "url": "/api/unicorn/addOrUpdate"
      }
    ],
    "version": "0.0.0",
    "filename": "src/api/controller/unicorn.ts",
    "groupTitle": "Unicorn"
  },
  {
    "type": "post",
    "url": "/api/unicorn/del",
    "title": "独角兽删除",
    "name": "del",
    "group": "Unicorn",
    "description": "<p>独角兽删除</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "id",
            "description": "<p>Id</p>"
          }
        ]
      }
    },
    "sampleRequest": [
      {
        "url": "/api/unicorn/del"
      }
    ],
    "version": "0.0.0",
    "filename": "src/api/controller/unicorn.ts",
    "groupTitle": "Unicorn"
  },
  {
    "type": "post",
    "url": "/api/unicorn/getList",
    "title": "独角兽获取",
    "name": "getList",
    "group": "Unicorn",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "type_id",
            "description": "<p>分类Id</p>"
          }
        ]
      }
    },
    "description": "<p>独角兽获取</p>",
    "sampleRequest": [
      {
        "url": "/api/unicorn/getList"
      }
    ],
    "version": "0.0.0",
    "filename": "src/api/controller/unicorn.ts",
    "groupTitle": "Unicorn"
  },
  {
    "type": "post",
    "url": "/api/user/getBackPassword",
    "title": "找回密码",
    "name": "getBack",
    "group": "User",
    "description": "<p>找回密码</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>邮箱</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "emailCode",
            "description": "<p>验证码</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>密码</p>"
          }
        ]
      }
    },
    "sampleRequest": [
      {
        "url": "/api/user/getBackPassword"
      }
    ],
    "version": "0.0.0",
    "filename": "src/api/controller/user.ts",
    "groupTitle": "User"
  },
  {
    "type": "post",
    "url": "/api/user/login",
    "title": "登陆",
    "name": "login",
    "group": "User",
    "description": "<p>登陆</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": "<p>账号</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>密码</p>"
          }
        ]
      }
    },
    "sampleRequest": [
      {
        "url": "/api/user/login"
      }
    ],
    "version": "0.0.0",
    "filename": "src/api/controller/user.ts",
    "groupTitle": "User"
  },
  {
    "type": "post",
    "url": "/api/user/registerUser",
    "title": "注册账号",
    "name": "registerUser",
    "group": "User",
    "description": "<p>注册账号</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>邮箱</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "accountNumber",
            "description": "<p>账号</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>密码</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "emailCode",
            "description": "<p>邮箱验证码</p>"
          }
        ]
      }
    },
    "sampleRequest": [
      {
        "url": "/api/user/registerUser"
      }
    ],
    "version": "0.0.0",
    "filename": "src/api/controller/user.ts",
    "groupTitle": "User"
  },
  {
    "type": "post",
    "url": "/api/user/sendMail",
    "title": "发送邮箱",
    "name": "sendMail",
    "group": "User",
    "description": "<p>发送邮箱</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>邮箱</p>"
          }
        ]
      }
    },
    "sampleRequest": [
      {
        "url": "/api/user/sendMail"
      }
    ],
    "version": "0.0.0",
    "filename": "src/api/controller/user.ts",
    "groupTitle": "User"
  },
  {
    "type": "post",
    "url": "/api/user/updatePassword",
    "title": "修改密码",
    "name": "updatePassword",
    "group": "User",
    "description": "<p>修改密码</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": "<p>账号</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "passwordOld",
            "description": "<p>原密码</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>新密码</p>"
          }
        ]
      }
    },
    "sampleRequest": [
      {
        "url": "/api/user/updatePassword"
      }
    ],
    "version": "0.0.0",
    "filename": "src/api/controller/user.ts",
    "groupTitle": "User"
  }
] });
