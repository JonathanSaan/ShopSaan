export default function ProductsList(req, res) {
  
  res.status(200).json([
    {
      id: 1,
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRG86ravF7bMdprFH0m5MA92sabMaNAAHiTyw&usqp=CAU",
      name: "Heart",
      price: "$500",
    },
    {
      id: 2,
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSKuJH3RG3Hf_K7O5J6A0VPMGN5MwATH6u-Sg&usqp=CAU",
      name: "Liver",
      price: "$300",
    },
    {
      id: 3,
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQD_eOf_BvJOQ2SK49lDFkOTaBAcVdUl_7nwQ&usqp=CAU",
      name: "Kidney",
      price: "$200",
    },
    {
      id: 4,
      img: "https://freesvg.org/img/johnny-automatic-lungs.png",
      name: "Lung",
      price: "$400",
    },
    {
      id: 5,
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTxUXRJslIhL7ksT8BUvVicMTZ9Q79zN-WG0Q&usqp=CAU",
      name: "Blood",
      price: "$50",
    },
    {
      id: 6,
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTEN8Gw4cIAIUkMDXh-t5k_Lv0HxNb4USj_Eg&usqp=CAU",
      name: "Pancreas",
      price: "$100",
    },
  ])
};