export const API_KEY = { ApiKeyAuth: [] };
export const BEARER_AUTH = { BearerAuth: [] };

export const json = (content: { [key: string]: string | Object }) => ({ content: { 'application/json': content } });

export const apiResponse = (content: { [key: string]: string }) => json({
  schema: {
    type: 'object',
    properties: {
      success: { type: 'boolean' },
      data: {
        type: 'object',
        properties: content,
      },
    },
  },
});

export const apiResponseArray = (items: any) => json({
  schema: {
    type: 'object',
    properties: {
      success: { type: 'boolean' },
      data: {
        type: 'array',
        items,
      },
    },
  },
});

export const apiResponseFromRef = (ref: string) => json({
  schema: {
    type: 'object',
    properties: {
      success: { type: 'boolean' },
      data: { $ref: ref },
    },
  },
});

export const apiResponseFromMultipleRef = (refs: string[]) => json({
  schema: {
    type: 'object',
    properties: {
      success: { type: 'boolean' },
      data: { oneOf: refs.map((ref) => ({ $ref: ref })) },
    },
  },
});
