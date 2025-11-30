import { sql } from "../db/db_connection";

export default function buildSequentialConditions(texto: string) {
    const tokens = texto
        .trim()
        .toLowerCase()
        .split(/\s+/);

    const conditions = tokens.map((token, index) => {
    return sql`
        EXISTS (
        SELECT 1
        FROM unnest(string_to_array(lower(nome), ' ')) WITH ORDINALITY AS w(word, pos)
        WHERE w.word LIKE ${token + '%'} 
        AND w.pos = ${index + 1}
        )
    `;
    });
    
    return conditions;
}
