import mongoose, { Schema } from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const MealSchema = new Schema(
  {
    userId: { type: Schema.ObjectId, require: true },
    name: { type: String, required: true },
    target: {
      type: String,
      enum: ['giam-mo', 'tang-can', 'duy-tri'],
      default: 'giam-mo',
      required: true,
    },
    gender: {
      type: String,
      enum: ['men', 'women'],
      required: true,
    },
    age: { type: Number, required: true },
    height: { type: Number, required: true },
    weight: { type: Number, required: true },
    active: { type: Number, required: true },
    meal: { type: Number, required: true },
    addInfo: { type: String, default: '' },
    suggest: [
      {
        type: new Schema({
          date: { type: String, required: true },
          meals: [
            {
              name: { type: String, required: true },
              dish: { type: String, required: true },
              ingredients: [
                {
                  name: { type: String, required: true },
                  amount: { type: String, required: true },
                },
              ],
              calories: { type: Number, required: true },
            },
          ],
        }),
      },
    ],
    startDate: { type: String, required: true },
    endDate: { type: String, required: true },
  },
  {
    timestamps: true,
    toObject: { virtuals: true },
    toJSON: { virtuals: true },
  },
);

MealSchema.plugin(mongoosePaginate);

const CUSTOM_COLLECTION_NAME = process.env.MEAL_COLLECTION || 'meals';

const Meal = mongoose.model('Meal', MealSchema, CUSTOM_COLLECTION_NAME);

export { Meal };
