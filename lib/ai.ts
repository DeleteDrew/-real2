import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"

export async function generateAIResponse(query: string): Promise<string> {
  try {
    // Check if we have an OpenAI API key in the environment
    const apiKey = process.env.OPENAI_API_KEY

    // If we have an API key, use the real OpenAI integration
    if (apiKey) {
      const { text } = await generateText({
        model: openai("gpt-4o"),
        prompt: query,
        system:
          "You are a helpful educational assistant. Provide clear, concise, and accurate information about the topic. Format your response in a way that's easy to understand, using paragraphs, bullet points, and examples where appropriate.",
      })
      return text
    }

    // Otherwise, use a mock implementation
    return generateMockResponse(query)
  } catch (error) {
    console.error("Error generating AI response:", error)
    return generateMockResponse(query)
  }
}

// Mock implementation that doesn't require an API key
function generateMockResponse(query: string): string {
  // Wait a bit to simulate API call
  const topics: Record<string, string> = {
    photosynthesis: `# Photosynthesis

Photosynthesis is the process by which plants, algae, and certain bacteria convert sunlight, water, and carbon dioxide into glucose (sugar) and oxygen.

## Key Components:
- **Sunlight**: Provides energy for the reaction
- **Chlorophyll**: The green pigment that captures light energy
- **Water**: Provides electrons and hydrogen atoms
- **Carbon Dioxide**: Provides carbon for building glucose

## The Process:
1. **Light-dependent reactions**: Occur in the thylakoid membrane
   - Chlorophyll absorbs sunlight
   - Water molecules are split, releasing oxygen
   - ATP and NADPH are produced

2. **Calvin Cycle (light-independent reactions)**:
   - Uses ATP and NADPH from the light-dependent reactions
   - Carbon dioxide is incorporated into organic molecules
   - Glucose and other carbohydrates are produced

This process is essential for life on Earth as it produces oxygen and serves as the primary source of energy for nearly all ecosystems.`,

    gravity: `# Gravity

Gravity is one of the four fundamental forces of nature. It's the force that attracts objects with mass toward each other.

## Key Concepts:

- **Newton's Law of Universal Gravitation**: Every particle of matter in the universe attracts every other particle with a force directly proportional to the product of their masses and inversely proportional to the square of the distance between them.

- **Einstein's General Relativity**: Gravity is not a force but a curvature of spacetime caused by mass and energy.

## Effects of Gravity:

1. **Weight**: What we experience as weight is actually the force of gravity pulling us toward Earth's center.

2. **Orbital Motion**: Planets orbit the Sun because gravity curves their path around it.

3. **Tides**: Caused by the Moon's gravitational pull on Earth's oceans.

4. **Gravitational Lensing**: Light bends as it passes through the curved spacetime around massive objects.

Gravity is the weakest of the four fundamental forces but acts over the longest range, making it the dominant force structuring the universe on the largest scales.`,

    programming: `# Introduction to Programming

Programming is the process of creating instructions for computers to perform specific tasks.

## Key Concepts:

### 1. Programming Languages
- **High-level languages**: Python, JavaScript, Java
- **Low-level languages**: C, Assembly
- Each language has its own syntax and use cases

### 2. Core Programming Concepts
- **Variables**: Store and manipulate data
- **Control Structures**: 
  - Conditionals (if/else)
  - Loops (for, while)
- **Functions**: Reusable blocks of code
- **Data Structures**: Arrays, lists, dictionaries, etc.

### 3. Programming Paradigms
- **Procedural**: Step-by-step instructions
- **Object-Oriented**: Using objects and classes
- **Functional**: Based on mathematical functions

### Getting Started:
1. Choose a beginner-friendly language like Python
2. Learn the basic syntax
3. Practice with small projects
4. Build more complex applications as you improve

Programming requires logical thinking and problem-solving skills, but anyone can learn with practice and persistence.`,
  }

  // Check if we have a pre-defined response for this query
  for (const [keyword, response] of Object.entries(topics)) {
    if (query.toLowerCase().includes(keyword.toLowerCase())) {
      return response
    }
  }

  // Default response for any other query
  return `# ${query}

Thank you for your question about "${query}". 

This is a demonstration of the AI explanation feature. In a production environment with a valid OpenAI API key, this would provide a detailed, educational response to your query.

## What You Would Learn:

- Key concepts related to ${query}
- Important definitions and terminology
- Practical applications and examples
- Related topics for further exploration

To see this feature in action with real AI-generated responses, you would need to:
1. Set up an OpenAI API key
2. Add it to your environment variables as OPENAI_API_KEY
3. Restart the application

For now, you can try the "Visual Learner" option to find relevant YouTube videos about this topic.`
}
