${
    // Enable extension methods by adding using Typewriter.Extensions.*
    using Typewriter.Extensions.Types;

    // Uncomment the constructor to change template settings.
    // Template(Settings settings)
    //{
     //   settings.IncludeProject("BookWorm");
        // Extend as you add new Model Projects.
    // }
}
${
    bool HasExcludedAttributes(Property property)
    {
        return property.Attributes.Any(a => a.Name == "IgnoreDataMember");
    }

    string ImportDeclarations(string containingTypeName, TypeParameterCollection typeParameters, PropertyCollection properties, string baseClassName)
    {
      List<string> imports = new List<string>();
      var typeNames = typeParameters.Select(t=>t.Name);
      foreach(var property in properties)
      {
          if (HasExcludedAttributes(property))
          {
            continue;
          }

          if(!property.Type.IsPrimitive|| property.Type.IsEnum)
          {
            var baseTypeName = GetBaseTypeName(property);
            var allTypes = GetAllTypes(baseTypeName);
            foreach (var typeName in allTypes) {
                if(char.IsLower(typeName[0]) || typeName == "List") {
                  continue;
                }
                if(typeNames.Contains(typeName) == false && typeName != "any" && typeName != containingTypeName)
                {   
                    imports.Add("import { " + typeName + " } from './" + typeName + "';");
                }
            }
            
          }
          else if(property.Type.IsPrimitive) {
            var allTypeArgumentNames = property.Type.TypeArguments.Select(entry => entry.Name);
            var complexTypeArguments = allTypeArgumentNames.Where(entry => !IsPrimitiveType(entry));
            foreach(var typeName in complexTypeArguments) { 
                var genericIndex = typeName.IndexOf("<");
                var processedTypeName = typeName;
                if(genericIndex >= 0) {
                    processedTypeName = typeName.Substring(genericIndex);
                }
                imports.Add("import { " + processedTypeName + " } from './" + processedTypeName + "';");
            }
          }
      }

      if(baseClassName != null && baseClassName != "any" && baseClassName != "ValueType")
      {
          var importClassName = RemoveGenericsType(baseClassName);
          imports.Add("import { " + importClassName + " } from './" + importClassName + "';");
      }

      return string.Join(Environment.NewLine, imports.Distinct());
    }

    string ImportDeclarations(Record record)
    {
        return ImportDeclarations(record.Name, record.TypeParameters, record.Properties, record.BaseRecord?.Name);
    }

    string ImportDeclarations(Class type) 
    {
        return ImportDeclarations(type.Name, type.TypeParameters, type.Properties, type.BaseClass?.Name);
    }

    string GetBaseTypeName(Property property) {
        string name = "any";
        if(!property.GetType().IsGenericType) {
            name = property.Type.Name.Replace("[]", string.Empty);
        }
        
        return name;
    }

    string GetTypeName(Property property) {

        string typeName = "any";
        if(property.Type.name != "date")
        {
            typeName = property.Type.Name;
        }
        if(property.Type.OriginalName == "string") {
            typeName = "string";
        }
        
        return typeName;
    }

        // https://github.com/frhagn/Typewriter/issues/36
    string ClassNameWithExtends(Class c) {
        string name = c.Name + c.TypeParameters?.ToString() + (c.BaseClass!=null ?  " extends " + c.BaseClass.Name + c.BaseClass.TypeArguments.ToString() : "");
        return name;
    }

    bool IsPrimitiveType(string typeName) {
        typeName = typeName.Replace("[]", string.Empty);
        var primitiveTypeNames = new List<string>(){"string", "number", "boolean"};
        return primitiveTypeNames.Contains(typeName);
    }

    List<string> GetAllTypes(string propertyString) {
        var result = new List<string>();
        var remainingPropertyString = propertyString;
        int offset;

        do {
            offset = remainingPropertyString.IndexOfAny(new char[]{'<', ','});
            if(offset < 0) {
                offset = remainingPropertyString.Count();
            }
            var classNamePart = remainingPropertyString.Substring(0, offset);
            var className = new string(Array.FindAll<char>(classNamePart.ToCharArray(),((c)=>(char.IsLetterOrDigit(c)))));
            result.Add(className);
            if(offset < remainingPropertyString.Count()) {
                remainingPropertyString = propertyString.Substring(offset + 1);
            }
        } while(offset < remainingPropertyString.Count());

        return result;
    }

    string RemoveGenericsType(string className) {
        var idx = className.IndexOf('<');

        if (idx > 0) {
            className = className.Substring(0, idx);
        }

        return className;
    }
}
/* tslint:disable */
/* eslint-disable */
/* auto-generated file. do not modify */

$Enums([TypewriterEnabled])[
export enum $Name {
    $Values[$Name = $Value,
    ]
}]
$Classes([TypewriterEnabled])[
$ImportDeclarations

export class $ClassNameWithExtends {
    $Properties(p => !HasExcludedAttributes(p))[$name?: $GetTypeName;
    ]
}]$Records([TypewriterEnabled])[
$ImportDeclarations

export class $Name {
    $Properties(p => !HasExcludedAttributes(p))[$name?: $GetTypeName;
    ]
}]
