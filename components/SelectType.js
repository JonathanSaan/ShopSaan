import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

import styles from "../styles/Product.module.scss";

const SelectType = ({ product, typeBlood, setTypeBlood }) => {
  const handleChange = (e) => {
    setTypeBlood(e.target.value);
  };

  if (product.types == null) {
    return null;
  };
  
  return (
    <Select
        value={typeBlood}
        onChange={handleChange}
        displayEmpty
        className={styles.productSelect}
        defaultValue={Object.values(product.types)[0]}
        inputProps={{ 'aria-label': 'Without label' }}
    >
        {Object.values(product.types).map((type, index) => (
            <MenuItem
                key={type}
                value={type}>
                    {type}
            </MenuItem>
        ))}
    </Select>
  );
};

export default SelectType;