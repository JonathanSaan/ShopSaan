import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

import styles from "../styles/Product.module.scss";

const SelectType = ({ product, typeChosen, setTypeChosen }) => {
  const handleChange = (e) => {
    setTypeChosen(e.target.value);
  };

  if (typeChosen == null) {
    return null;
  };
  
  return (
    <Select
      value={typeChosen}
      onChange={handleChange}
      displayEmpty
      className={styles.productSelect}
      inputProps={{ 'aria-label': 'Without label' }}
    >
      {Object.values(product.types).map((type) => (
        <MenuItem
          key={type.id}
          value={type}>
            {type.type}
        </MenuItem>
      ))}
    </Select>
  );
};

export default SelectType;