type TypeAndValues = {
    type: string;
    values?: Array<string> | undefined;
};
type Match = Array<string>;
type Variant = Array<string> | undefined;

type TestType = [Array<TypeAndValues>, Array<TypeAndValues>?, Array<Variant>?];

const case1: TestType = [
    [],
    [
        {
            type: "Style",
            values: ["Classic", "Modern"]
        }
    ],
    []
];

const case1_answer = [
    ['Classic'],
    ['Modern']
]

const case2: TestType = [
    [
        {
            type: "Style",
            values: ["Classic", "Modern"]
        }
    ],
    [
        {
            type: "Size",
            values: ["Medium", "Large", "Small"]
        }
    ],
    [
        ['Classic'],
        ['Modern']
    ]
];
const case2_answer = [
    ['Classic', 'Large'],
    ['Classic', 'Small'],
    ['Classic', 'Medium'],
    ['Modern', 'Large'],
    ['Modern', 'Medium'],
    ['Modern', 'Small'],
]

const case3: TestType = [
    [
        {
            type: "Style",
            values: ["Classic", "Modern"]
        },
        {
            type: "Size",
            values: ["Medium", "Large", "Small"]
        }
    ],
    [
        {
            type: "Color",
            values: ["Red", "Blue"]
        }
    ],
    [
        ['Classic', "Medium"],
        ['Classic', "Small"],
        ['Modern', "Large"],
        ['Modern', "Small"]
    ]
];

const case3_answer = [
    ['Classic', 'Medium', 'Red'],
    ['Classic', 'Medium', 'Blue'],
    ['Classic', 'Small', 'Red'],
    ['Classic', 'Small', 'Blue'],
    ['Modern', 'Large', 'Red'],
    ['Modern', 'Large', 'Blue'],
    ['Modern', 'Small', 'Red'],
    ['Modern', 'Small', 'Blue'],
]

const case4: TestType = [
    [
        {
            type: "Style",
            values: ["Classic", "Modern"]
        },
        {
            type: "Size",
            values: ["Medium", "Large", "Small"]
        }
    ],
    [
        {
            type: "Size",
            values: ["Large", "Small"]
        }
    ],
    [
        ['Classic', 'Large'],
        ['Classic', 'Medium'],
        ['Classic', 'Small'],
        ['Modern', 'Large'],
        ['Modern', 'Medium'],
        ['Modern', 'Small'],
    ]
];

const case4_answer = [
    ['Classic', 'Large'],
    ['Classic', 'Small'],
    ['Modern', 'Large'],
    ['Modern', 'Small'],
]

const case5: TestType = [
    [
        {
            type: "Style",
            values: ["Classic", "Modern"]
        },
        {
            type: "Size",
            values: ["Medium", "Large", "Small"]
        },
        {
            type: "Color",
            values: ["Red", "Blue"]
        }
    ],
    [
        {
            type: "Size",
            values: ["Large", "Small", "ExtraLarge"]
        },
    ],
    [
        ['Classic', 'Large', 'Blue'],
        ['Classic', 'Medium', 'Red'],
        ['Classic', 'Medium', 'Blue'],
        ['Modern', 'Large', 'Red'],
        ['Modern', 'Medium', 'Blue'],
        ['Modern', 'Small', 'Red'],
        ['Modern', 'Small', 'Blue'],
    ]
]
const case5_answer = [
  [ 'Classic', 'Large', 'Blue' ],
  [ 'Classic', 'ExtraLarge', 'Red' ],
  [ 'Classic', 'ExtraLarge', 'Blue' ],
  [ 'Modern', 'Large', 'Red' ],
  [ 'Modern', 'Small', 'Red' ],
  [ 'Modern', 'Small', 'Blue' ],
  [ 'Modern', 'ExtraLarge', 'Red' ],
  [ 'Modern', 'ExtraLarge', 'Blue' ]
];

const case6: TestType = [
    [
        {
            type: "Style",
            values: ["Classic", "Modern"]
        },
        {
            type: "Size",
            values: ["Medium", "Large", "Small"]
        },
        {
            type: "Color",
            values: ["Red", "Blue"]
        }
    ],
    [
        {
            type: "Color",
        },
    ],
    [
        ['Classic', 'Large', 'Blue'],
        ['Classic', 'Medium', 'Red'],
        ['Classic', 'Medium', 'Blue'],
        ['Modern', 'Large', 'Red'],
        ['Modern', 'Small', 'Red'],
        ['Modern', 'Small', 'Blue'],
    ]
]
const case6_answer = [
    ['Classic', 'Large'],
    ['Classic', 'Medium'],
    ['Modern', 'Large'],
    ['Modern', 'Small'],
];

const case7: TestType = [
    [
        {
            type: "Style",
            values: ["Classic", "Modern"]
        },
        {
            type: "Size",
            values: ["Medium", "Large", "Small"]
        },
        {
            type: "Color",
            values: ["Red", "Blue"]
        }
    ],
    [
        {
            type: "Size",
            values: ["Large", "Medium", "Small"]
        },
    ],
    [
        ['Classic', 'Large', 'Blue'],
        ['Classic', 'Medium', 'Red'],
        ['Classic', 'Medium', 'Blue'],
        ['Modern', 'Large', 'Red'],
        ['Modern', 'Medium', 'Blue'],
        ['Modern', 'Small', 'Red'],
        ['Modern', 'Small', 'Blue'],
    ]
]
const case7_answer = [
    ['Classic', 'Large', 'Blue'],
    ['Classic', 'Medium', 'Red'],
    ['Classic', 'Medium', 'Blue'],
    ['Modern', 'Large', 'Red'],
    ['Modern', 'Medium', 'Blue'],
    ['Modern', 'Small', 'Red'],
    ['Modern', 'Small', 'Blue'],
];

import { getProducts } from '../src/main.js';

test("Product test", () => {
    expect(getProducts(...case1).sort()).toEqual(case1_answer.sort());
    expect(getProducts(...case2).sort()).toEqual(case2_answer.sort());
    expect(getProducts(...case3).sort()).toEqual(case3_answer.sort());
    expect(getProducts(...case4).sort()).toEqual(case4_answer.sort());
    expect(getProducts(...case5).sort()).toEqual(case5_answer.sort());
    expect(getProducts(...case6).sort()).toEqual(case6_answer.sort());
    expect(getProducts(...case7).sort()).toEqual(case7_answer.sort());
});
