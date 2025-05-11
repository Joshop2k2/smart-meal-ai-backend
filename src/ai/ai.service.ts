import { OpenAI } from 'openai';
import { config } from '../config';

const openai = new OpenAI({
  apiKey: config.ai.key,
});

const targets = {
  'giam-mo': 'Giảm cân, giảm mỡ',
  'tang-can': 'Tăng cân',
  'duy-tri': 'Duy trì cân nặng',
};

const genders = {
  men: 'Nam',
  women: 'Nữ',
};

const actives = {
  1: 'Ít hoạt động, chỉ ăn đi làm về ngủ',
  2: 'Có tập nhẹ nhàng, tuần 1-3 buổi',
  3: 'Có vận động vừa 4-5 buổi',
  4: 'Vận động nhiều 6-7 buổi',
  5: 'Vận động rất nhiều ngày tập 2 lần',
};

export interface MealRequest {
  startDate: Date;
  endDate: Date;
  target: 'giam-mo' | 'tang-can' | 'duy-tri';
  age: number;
  gender: 'men' | 'women';
  height: number;
  weight: number;
  active: 1 | 2 | 3 | 4 | 5;
  meal: number;
  addInfo?: string;
}

export async function getMealPlan(request: MealRequest) {
  const prompt = `
Bạn là chuyên gia dinh dưỡng. Hãy tạo thực đơn chi tiết theo thông tin sau:

- Ngày bắt đầu: ${request.startDate}
- Ngày kết thúc: ${request.endDate}
- Tuổi: ${request.age}
- Giới tính: ${genders[request.gender]}
- Mục tiêu: ${targets[request.target]}
- Chiều cao: ${request.height} cm
- Cân nặng: ${request.weight} kg
- Mức độ vận động: ${actives[request.active]}
${request.addInfo ? `- Thông tin thêm: ${request.addInfo}` : ''}

Yêu cầu:
- Các món ăn món ăn thuần Việt, phù hợp với người miền bắc Việt Nam.
- Các món phù hợp với thể trạng, mục tiêu của người dùng.
- Mỗi ngày có ${request.meal} bữa, phân bổ đều calo trong ngày.
- Mỗi bữa có tên món ăn, danh sách nguyên liệu với khối lượng (gram hoặc ml).
- Mỗi bữa ghi rõ tổng số kcal.
Trả về JSON như sau (không chú thích, không giải thích):
[
  {
    "date": "03-05-2025",
    "meals": [
      {
        "name": "Bữa sáng",
        "dish": "Cháo yến mạch với trái cây",
        "ingredients": [
          { "name": "Yến mạch", "amount": "50g" },
          { "name": "Chuối", "amount": "1 quả" },
          { "name": "Sữa hạnh nhân", "amount": "150ml" }
        ],
        "calories": 350
      }
    ]
  }
]
`.trim();

  const chatCompletion = await openai.chat.completions.create({
    // model: 'gpt-4o-mini-2024-07-18',
    model: 'gpt-4o-2024-08-06',
    messages: [{ role: 'user', content: prompt }],
    temperature: 0.7,
  });
  console.log('finish call ');

  const content = chatCompletion.choices[0].message?.content ?? '';
  const cleaned = content.replace(/```json|```/g, '').trim();

  if (!content) throw new Error('No content in ChatGPT response');

  try {
    const parsed = JSON.parse(cleaned);
    return parsed;
  } catch (err) {
    console.error('Invalid JSON output from model:', content);
    throw err;
  }
}
