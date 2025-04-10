Each entry has this content structure information

-   **Content** - Content name
-   **Type Name** - type name, eg. `compoud` is a name of the type
-   **Type** - type of the entry, in most cases its type it self, but it might be a primitives as well. eg. `object`.

Here is example of Abstract Type Validator Definitions

```json
{
    "type": "compoud",
    "properties": [
        {
            "type": "string",
            "name": "my-property-name"
        }
    ]
}
```

## Type Type `_` `object`

-   **Type** `type` `string` type name, names.

## Compoud Type `compoud` `type`

And restricted object type with specific properties

-   **Properties** `properties` `array<type>` default -> empty array
    -   name - Name of the property
    -   optional - Is optional
-   **Whitelisted** `whitelisted` `boolien` Allows only specified properties - defualt true

## Map Type `map` `type`

Any number of properties but they have to share same value type.

-   **ValueType** `valueType` `type` - A value Type

## Array Type `array` `type`

-   **MaxSize** `maxSize` `number` - number default Number.MAX_INT
-   **MinSize** `MinSize` `number` - number default 0
-   **ValueType** `valueType` `type` - A value Type

## String Type `string` `type`

this type represents raw string, but it may have some additional properties

-   **ValidValues** `validValues` `array<string>` - Only specified values are valid values
-   **CaseCare** `caseCare` `boolean` - Care about letter case A->a, works only when validValues are specified.

## Number Type `number` `type`

this type represents raw number, but it may have some additional properties

-   **Max** `max` `number` - The value has to be smaller than specified max. Default Number.MAX_SAFE_INTEGER
-   **Min** `min` `number` - The value has to be bigger then specified min. Default Number.MIN_SAFE_INTEGER

## Boolean Type `boolean` `type`

this type represents raw boolean.

## Complex Type `complex` `type`

Its a type that is combination of sub-types specified in validTypes property

-   **ValidTypes** `validTypes` `array<type>` - Bunch of sub types, if at least one of them will be valid then this base type would pass as valid
