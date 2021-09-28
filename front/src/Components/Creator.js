import React from "react";
import { Link,} from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

export default function Creator() {
  return (
    <div>
    
      <form>
          <div>
              <label>
                Nombre del producto
              </label>
              <input type= 'text'>
              </input>
          </div>
          <div>
              <label>
                Precio del producto
              </label>
              <input type= 'number'>
              </input>
          </div>
          <div>
              <label>
                Nombre del producto
              </label>
              <input type= 'text'>
              </input>
          </div>
          <div>
              <label>
                Nombre del producto
              </label>
              <input type= 'text'>
              </input>
          </div>

      </form>
    </div>
  );
}

/*
name, price, description, image, stock 
*/