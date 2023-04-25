/* eslint-disable import/no-anonymous-default-export */
// displays all recipes in JSON format
import clientPromise from "../../lib/mongodb";

// Define default export function
export default async(req, res) => {
  try {
    // Connect to MongoDB client
    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB);

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    // Fetch recipes from MongoDB collection
    const recipes = await db
      .collection("recipes")
      .find({})
      .skip(skip)
      .limit(limit)
      .toArray();

    const recipeCount = await db.collection("recipes").countDocuments();

    // Send JSON response of fetched data
    res.status(200).json({
      recipes: recipes,
      totalPages: Math.ceil(recipeCount / limit),
      currentPage: page,
      totalRecipes: recipeCount,
    });
  } catch (error) {
    // Handle any error that occurs
    console.error(error);
  }
};