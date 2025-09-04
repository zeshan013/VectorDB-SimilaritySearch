export const CiscoSchema = {
  tableName: 'cisco',
  columns: {
    id: { type: 'TEXT', primaryKey: true },
    severity: { type: "ENUM('Low', 'Medium', 'High', 'Critical')", allowNull: false },
    title: { type: 'TEXT', allowNull: false },
    description: { type: 'TEXT' },
    iacontrols: { type: 'TEXT' },
    ruleID: { type: 'TEXT' },
    fixid: { type: 'TEXT' },
    fixtext: { type: 'TEXT' },
    checkid: { type: 'TEXT' },
    checktext: { type: 'TEXT' },
    title_vector: { type: 'VECTOR(384)' },
    description_vector: { type: 'VECTOR(384)' },
    checktext_vector: { type: 'VECTOR(384)' },
    fixtext_vector: { type: 'VECTOR(384)' }
  }
};
