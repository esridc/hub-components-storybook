export const ENTITY = {
  id: "00123",
  name: "Mock Entity",
  type: "Hub Initiative",
  associations: {
    groupId: "c148a24786ba43ac99f4fdb097cbe32b",
    "rules": {
      "schemaVersion": 1,
      "query": {
        "targetEntity": "item",
        "filters": [
          {
            "predicates": [
              {
                "group": "c148a24786ba43ac99f4fdb097cbe32b"
              }
            ]
          }
        ]
      }
    }
  }
};
export const MEMBERS_QUERY = {
  targetEntity: 'groupMember',
  filters: [
    {
      predicates: [
        {
          group: "c148a24786ba43ac99f4fdb097cbe32b",
        }
      ]
    }
  ]
};
