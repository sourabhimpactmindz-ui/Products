
// export const getcart = async(req,res) =>{
//   const userid = req.userid;
 
//     try{
//         const cart = await Cart.findOne({userid:userid},{_id:0}).populate({
//         path: "userid",
//         select: "-password -__v -createdAt -updatedAt"
//     }).populate({
//                 path: "products.product",   
//                 select: "name price description -_id"   
//             });
        
//         if(!cart || !cart.length === 0){
//             return res.status(401).json({message:"user cart is not found",status:false})
//         }

//         return res.status(200).json({message:"Cart founded successfully",status:true,cart:cart})
//     }catch(err){
//         console.log({message:"server error",error:err.message})
//     }
// }




// export const getcart = async (req, res) => {
//   try {
//     const { id } = req.params;

//     const cart = await User.aggregate([
//       {
//         $lookup: {
//           from: "carts",
//           localField: "_id",
//           foreignField: "userid",
//           as: "Name"
//         }
//       },
//       {
//         $unwind: "$Name"
//       },
//       {$match: {
//           "Name._id": new mongoose.Types.ObjectId(id)}
//       },
      
//       {$project: { _id: 0,name: 1}}
//     ]);

//     if (cart.length === 0) {
//       return res.status(404).json({message: "Cart not found",status: false});
//     }

//     return res.status(200).json({message: "Successfully fetched",status: true,Name:cart});

//   } catch (err) {
//     console.log(err);
//     return res.status(500).json({message: "Server error",error: err.message});
//   }
// };


// export const getproduct = async (req, res) => {
//     try {

//         const products = await Product.aggregate([
//             {$match : {Product : {$gte : 10}}},
//             {$project : {email : 1}}

//         ])
//         if (!product || !product.length === 0) {
//             return res.status(401).json({ message: "Product is not found", status: false })
//         } else {
//             return res.status(200).json({ message: "All products", product: product, status: true })
//         }
//     } catch (err) {
//         console.log({ message: "server error", error: err.message, status: false })
//     }
// }