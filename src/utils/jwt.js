/**
 * JWT Utility Functions (Simulated JSON Web Token Implementation)
 *
 * Implements:
 * 1. Base64Url Encoding & Decoding
 * 2. Header.Payload.Signature generation
 * 3. Token decoding and verification
 */

// Helper to encode string to Base64Url (RFC 7515 compliant)
export const base64UrlEncode = (str) => {
  try {
    return btoa(unescape(encodeURIComponent(str)))
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=+$/, '');
  } catch (e) {
    console.error('Error encoding Base64Url:', e);
    return '';
  }
};

// Helper to decode Base64Url to string
export const base64UrlDecode = (str) => {
  try {
    let base64 = str.replace(/-/g, '+').replace(/_/g, '/');
    while (base64.length % 4) {
      base64 += '=';
    }
    return decodeURIComponent(escape(atob(base64)));
  } catch (e) {
    console.error('Error decoding Base64Url:', e);
    return null;
  }
};

/**
 * Generate simulated JWT token
 * Structure: Header.Payload.Signature
 *
 * @param {Object} payload - User data (userId, role, username, etc.)
 * @returns {string} - Formatted JWT string
 */
export const generateToken = (payload) => {
  const header = {
    alg: 'HS256',
    typ: 'JWT'
  };

  const enrichedPayload = {
    ...payload,
    iat: Math.floor(Date.now() / 1000), // Issued at
    exp: Math.floor(Date.now() / 1000) + 3600 // Expires in 1 hour
  };

  const encodedHeader = base64UrlEncode(JSON.stringify(header));
  const encodedPayload = base64UrlEncode(JSON.stringify(enrichedPayload));

  // Simulated HMAC-SHA256 signature representation
  const secretKey = 'college_lab_mst_jwt_secret_key';
  const rawSignatureInput = `${encodedHeader}.${encodedPayload}.${secretKey}`;
  const encodedSignature = base64UrlEncode(rawSignatureInput).slice(0, 43); // Compact signature representation

  return `${encodedHeader}.${encodedPayload}.${encodedSignature}`;
};

/**
 * Decode JWT token
 *
 * @param {string} token - The raw JWT string
 * @returns {Object|null} - Decoded payload object, or null if invalid
 */
export const decodeToken = (token) => {
  if (!token || typeof token !== 'string') return null;

  const parts = token.split('.');
  if (parts.length !== 3) return null;

  try {
    const payloadJson = base64UrlDecode(parts[1]);
    if (!payloadJson) return null;
    return JSON.parse(payloadJson);
  } catch (error) {
    console.error('Failed to parse JWT payload:', error);
    return null;
  }
};

/**
 * Get full JWT details (Header, Payload, Signature) for inspection
 *
 * @param {string} token
 * @returns {Object|null}
 */
export const getFullTokenDetails = (token) => {
  if (!token || typeof token !== 'string') return null;

  const parts = token.split('.');
  if (parts.length !== 3) return null;

  try {
    const headerJson = base64UrlDecode(parts[0]);
    const payloadJson = base64UrlDecode(parts[1]);

    return {
      raw: token,
      header: headerJson ? JSON.parse(headerJson) : null,
      payload: payloadJson ? JSON.parse(payloadJson) : null,
      signature: parts[2],
      parts: {
        headerPart: parts[0],
        payloadPart: parts[1],
        signaturePart: parts[2]
      }
    };
  } catch (error) {
    console.error('Failed to parse token details:', error);
    return null;
  }
};
