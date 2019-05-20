define({ "api": [
  {
    "type": "get",
    "url": "/api/index/list",
    "title": "列表接口",
    "name": "list",
    "group": "file",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "pageSize",
            "description": "<p>页面大小.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "pageNum",
            "description": "<p>页码.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "pageSize",
            "description": "<p>页面大小.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "pageTotal",
            "description": "<p>总页数.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "pageNum",
            "description": "<p>页码.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "list",
            "description": "<p>数据列表.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/api/controller/index.ts",
    "groupTitle": "file"
  }
] });
