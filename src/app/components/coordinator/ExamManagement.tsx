import { useState } from "react";
import { useNavigate } from "react-router";
import { Plus, Pencil, Trash2, Eye, X, Minus, Info } from "lucide-react";
import { PageHeader, PrimaryBtn, StatusBadge, colors, EmptyState } from "../shared";
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from "@mui/material";

const EXAMS = [
  { id: 1, name: "Examen Teórico de Seguridad contra Incendios", questions: 15, attempts: 3, usedIn: 2, status: "activo" },
  { id: 2, name: "Evaluación de Conocimientos LOTO", questions: 20, attempts: 2, usedIn: 1, status: "activo" },
  { id: 3, name: "Prueba de Identificación de EPP", questions: 10, attempts: 3, usedIn: 1, status: "activo" },
  { id: 4, name: "Cuestionario Previo Entrada Espacio Confinado", questions: 12, attempts: 2, usedIn: 0, status: "borrador" },
];

const INITIAL_QUESTIONS = [
  { id: 1, text: "¿Cuál es la primera acción a tomar cuando suena una alarma de incendio bajo tierra?", category: "Seguridad Incendios", options: 4, usedIn: 2, hasAttempts: true, optionsText: ["Llamar a emergencias", "Evacuar inmediatamente", "Buscar la fuente del incendio", "Esperar instrucciones"], correct: 1 },
  { id: 2, text: "¿Qué EPP es obligatorio al entrar en un espacio confinado?", category: "EPP", options: 4, usedIn: 1, hasAttempts: true, optionsText: ["Casco y guantes", "Arnés y línea de vida", "Gafas de seguridad", "Mascarilla"], correct: 1 },
  { id: 3, text: "¿Cuántos pasos hay en el procedimiento estándar LOTO?", category: "Energía", options: 4, usedIn: 1, hasAttempts: false, optionsText: ["4", "5", "6", "7"], correct: 2 },
  { id: 4, text: "¿Qué significa IDLH en las regulaciones de espacios confinados?", category: "Espacios Confinados", options: 4, usedIn: 1, hasAttempts: false, optionsText: ["Peligro Inmediato para la Vida o la Salud", "Nivel de Peligro Determinado", "Índice de Daño Localizado", "Ninguna de las anteriores"], correct: 0 },
  { id: 5, text: "¿Cuándo se debe inspeccionar el EPP antes de su uso?", category: "EPP", options: 4, usedIn: 0, hasAttempts: false, optionsText: ["Cada mes", "Cada semana", "Antes de cada uso", "Solo cuando se vea dañado"], correct: 2 },
  { id: 6, text: "¿Cuál es el límite de oxígeno seguro en espacios confinados?", category: "Espacios Confinados", options: 4, usedIn: 0, hasAttempts: false, optionsText: ["19.5% - 23.5%", "15.0% - 20.0%", "21.0% - 25.0%", "18.0% - 21.0%"], correct: 0 },
];

interface Question {
  id: number;
  text: string;
  category: string;
  options: number;
  usedIn: number;
  hasAttempts: boolean;
  optionsText: string[];
  correct: number;
}

interface QuestionForm {
  text: string;
  options: string[];
  correct: number;
  category: string;
}

function QuestionDrawer({ onClose, questionToEdit, viewOnly = false }: { onClose: () => void, questionToEdit?: Question, viewOnly?: boolean }) {
  const isReadOnly = viewOnly || (questionToEdit ? questionToEdit.hasAttempts : false);
  
  const [form, setForm] = useState<QuestionForm>({
    text: questionToEdit?.text || "",
    options: questionToEdit?.optionsText || ["", "", "", ""],
    correct: questionToEdit?.correct ?? 0,
    category: questionToEdit?.category || "",
  });

  const addOption = () => { if (form.options.length < 5) setForm(p => ({ ...p, options: [...p.options, ""] })); };
  const removeOption = (i: number) => { if (form.options.length > 2) setForm(p => ({ ...p, options: p.options.filter((_, idx) => idx !== i) })); };
  const updateOption = (i: number, v: string) => setForm(p => ({ ...p, options: p.options.map((o, idx) => idx === i ? v : o) }));

  return (
    <div className="fixed inset-0 z-50 flex">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="absolute right-0 top-0 bottom-0 w-[520px] bg-white shadow-2xl flex flex-col">
        <div className="flex items-center justify-between px-6 py-5 border-b" style={{ borderColor: colors.border }}>
          <h3 className="font-semibold" style={{ color: colors.textPrimary }}>
            {viewOnly ? "Ver Pregunta" : (questionToEdit ? "Editar Pregunta" : "Nueva Pregunta")}
          </h3>
          <button onClick={onClose}><X size={18} /></button>
        </div>
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          
          {!viewOnly && isReadOnly && (
            <div className="bg-blue-50 border border-blue-200 p-3 rounded-lg flex gap-3 text-sm text-blue-800">
              <Info size={18} className="shrink-0 mt-0.5" />
              <p>Esta pregunta tiene intentos de examen registrados. Para preservar la integridad de los registros, no se puede modificar el enunciado ni las opciones de respuesta. Si requieres hacer cambios, debes crear una nueva versión de la pregunta.</p>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: colors.textPrimary }}>Texto de la Pregunta *</label>
            <textarea value={form.text} onChange={e => setForm(p => ({ ...p, text: e.target.value }))}
              rows={3} placeholder="Ingresa la pregunta aquí..." disabled={isReadOnly}
              className={`w-full px-3 py-2.5 rounded-lg border text-sm outline-none resize-none ${isReadOnly ? 'bg-gray-50 text-gray-500 cursor-not-allowed' : ''}`} style={{ borderColor: colors.border }} />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: colors.textPrimary }}>Categoría</label>
            <input value={form.category} onChange={e => setForm(p => ({ ...p, category: e.target.value }))}
              placeholder="ej. Seguridad Incendios, EPP, Energía" disabled={viewOnly}
              className={`w-full px-3 py-2.5 rounded-lg border text-sm outline-none ${viewOnly ? 'bg-gray-50 text-gray-500 cursor-not-allowed' : ''}`} style={{ borderColor: colors.border }} />
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-medium" style={{ color: colors.textPrimary }}>Opciones de Respuesta *</label>
              {!isReadOnly && form.options.length < 5 && (
                <button onClick={addOption} className="text-xs font-medium flex items-center gap-1" style={{ color: colors.primary }}>
                  <Plus size={12} /> Añadir opción
                </button>
              )}
            </div>
            <div className="space-y-2">
              {form.options.map((opt, i) => (
                <div key={i} className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="correct"
                    checked={form.correct === i}
                    onChange={() => setForm(p => ({ ...p, correct: i }))}
                    disabled={isReadOnly}
                    style={{ accentColor: colors.success }}
                    title="Marcar como respuesta correcta"
                  />
                  <input
                    value={opt}
                    onChange={e => updateOption(i, e.target.value)}
                    placeholder={`Opción ${i + 1}`}
                    disabled={isReadOnly}
                    className={`flex-1 px-3 py-2 rounded-lg border text-sm outline-none ${isReadOnly ? 'bg-gray-50 text-gray-500 cursor-not-allowed' : ''}`}
                    style={{ borderColor: form.correct === i ? colors.success : colors.border }}
                  />
                  {!isReadOnly && form.options.length > 2 && (
                    <button onClick={() => removeOption(i)} className="p-1 rounded hover:bg-red-50">
                      <Minus size={14} style={{ color: colors.error }} />
                    </button>
                  )}
                </div>
              ))}
            </div>
            {!isReadOnly && <p className="text-xs mt-2" style={{ color: colors.textSecondary }}>Selecciona el botón junto a la respuesta correcta</p>}
          </div>
        </div>
        <div className="px-6 py-4 border-t flex justify-end gap-3" style={{ borderColor: colors.border }}>
          {viewOnly ? (
            <PrimaryBtn onClick={onClose}>Cerrar</PrimaryBtn>
          ) : (
            <>
              <button onClick={onClose} className="px-4 py-2 rounded-lg border text-sm font-medium" style={{ borderColor: colors.border, color: colors.textSecondary }}>Cancelar</button>
              <PrimaryBtn onClick={onClose}>Guardar Cambios</PrimaryBtn>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export function ExamManagement() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<"exams" | "questions">("exams");
  const [showQuestionDrawer, setShowQuestionDrawer] = useState(false);
  
  // State for Question Bank
  const [questions, setQuestions] = useState<Question[]>(INITIAL_QUESTIONS);
  const [questionToEdit, setQuestionToEdit] = useState<Question | undefined>(undefined);
  const [viewOnlyDrawer, setViewOnlyDrawer] = useState(false);
  const [deleteQuestionId, setDeleteQuestionId] = useState<number | null>(null);

  const handleCreateQuestion = () => {
    setQuestionToEdit(undefined);
    setViewOnlyDrawer(false);
    setShowQuestionDrawer(true);
  };

  const handleEditQuestion = (q: Question, viewOnly = false) => {
    setQuestionToEdit(q);
    setViewOnlyDrawer(viewOnly);
    setShowQuestionDrawer(true);
  };

  const handleConfirmDelete = () => {
    if (deleteQuestionId !== null) {
      setQuestions(prev => prev.filter(q => q.id !== deleteQuestionId));
      setDeleteQuestionId(null);
    }
  };

  return (
    <div>
      <PageHeader
        title="Exámenes Teóricos"
        actions={
          activeTab === "exams"
            ? <PrimaryBtn onClick={() => navigate("new")}><Plus size={16} /> Nuevo Examen</PrimaryBtn>
            : <PrimaryBtn onClick={handleCreateQuestion}><Plus size={16} /> Nueva Pregunta</PrimaryBtn>
        }
      />

      <div className="flex gap-1 mb-6 p-1 bg-white rounded-xl border w-fit" style={{ borderColor: colors.border }}>
        {[{ key: "exams", label: "Exámenes" }, { key: "questions", label: "Banco de Preguntas" }].map(tab => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key as "exams" | "questions")}
            className="px-4 py-2 rounded-lg text-sm font-medium transition-colors"
            style={{ backgroundColor: activeTab === tab.key ? colors.primary : "transparent", color: activeTab === tab.key ? "white" : colors.textSecondary }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === "exams" ? (
        <div className="bg-white rounded-xl border overflow-hidden shadow-sm" style={{ borderColor: colors.border }}>
          <table className="w-full text-sm">
            <thead style={{ backgroundColor: colors.bg, borderBottom: `1px solid ${colors.border}` }}>
              <tr>
                {["Nombre del Examen", "Preguntas", "Intentos Máx", "Usado En", "Estado", "Acciones"].map(h => (
                  <th key={h} className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider" style={{ color: colors.textSecondary }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {EXAMS.map((e, i) => (
                <tr key={e.id} style={{ borderBottom: i < EXAMS.length - 1 ? `1px solid ${colors.border}` : "none" }}
                  onMouseEnter={el => (el.currentTarget as HTMLTableRowElement).style.backgroundColor = "#F8FAFC"}
                  onMouseLeave={el => (el.currentTarget as HTMLTableRowElement).style.backgroundColor = ""}>
                  <td className="px-5 py-3.5 font-medium" style={{ color: colors.textPrimary }}>{e.name}</td>
                  <td className="px-5 py-3.5" style={{ color: colors.textSecondary }}>{e.questions}</td>
                  <td className="px-5 py-3.5" style={{ color: colors.textSecondary }}>{e.attempts}</td>
                  <td className="px-5 py-3.5" style={{ color: colors.textSecondary }}>{e.usedIn} programa{e.usedIn !== 1 ? "s" : ""}</td>
                  <td className="px-5 py-3.5"><StatusBadge status={e.status} /></td>
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-2">
                      <button className="p-1.5 rounded-lg hover:bg-gray-100"><Eye size={15} style={{ color: colors.textSecondary }} /></button>
                      <button className="p-1.5 rounded-lg hover:bg-gray-100"><Pencil size={15} style={{ color: colors.textSecondary }} /></button>
                      {e.usedIn === 0 && <button className="p-1.5 rounded-lg hover:bg-red-50"><Trash2 size={15} style={{ color: colors.error }} /></button>}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="bg-white rounded-xl border overflow-hidden shadow-sm" style={{ borderColor: colors.border }}>
          <table className="w-full text-sm">
            <thead style={{ backgroundColor: colors.bg, borderBottom: `1px solid ${colors.border}` }}>
              <tr>
                {["Pregunta", "Categoría", "Opciones", "Usado En", "Acciones"].map(h => (
                  <th key={h} className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider" style={{ color: colors.textSecondary }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {questions.length === 0 ? (
                <tr><td colSpan={5}><EmptyState title="No hay preguntas aún" subtitle="Crea tu primera pregunta usando el botón de arriba" action={<PrimaryBtn onClick={handleCreateQuestion}><Plus size={16} /> Nueva Pregunta</PrimaryBtn>} /></td></tr>
              ) : questions.map((q, i) => (
                <tr key={q.id} style={{ borderBottom: i < questions.length - 1 ? `1px solid ${colors.border}` : "none" }}
                  onMouseEnter={el => (el.currentTarget as HTMLTableRowElement).style.backgroundColor = "#F8FAFC"}
                  onMouseLeave={el => (el.currentTarget as HTMLTableRowElement).style.backgroundColor = ""}>
                  <td className="px-5 py-3.5 max-w-xs">
                    <p className="text-sm font-medium line-clamp-2" style={{ color: colors.textPrimary }}>{q.text}</p>
                  </td>
                  <td className="px-5 py-3.5">
                    <span className="text-xs px-2 py-1 rounded-full font-medium" style={{ backgroundColor: `${colors.primary}15`, color: colors.primary }}>{q.category}</span>
                  </td>
                  <td className="px-5 py-3.5" style={{ color: colors.textSecondary }}>{q.options}</td>
                  <td className="px-5 py-3.5" style={{ color: colors.textSecondary }}>{q.usedIn} examen{q.usedIn !== 1 ? "es" : ""}</td>
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-2">
                      <button className="p-1.5 rounded-lg hover:bg-gray-100" title="Ver" onClick={() => handleEditQuestion(q, true)}>
                        <Eye size={15} style={{ color: colors.textSecondary }} />
                      </button>
                      <button className="p-1.5 rounded-lg hover:bg-gray-100" title="Editar" onClick={() => handleEditQuestion(q, false)}>
                        <Pencil size={15} style={{ color: colors.textSecondary }} />
                      </button>
                      {q.usedIn === 0 && !q.hasAttempts && (
                        <button className="p-1.5 rounded-lg hover:bg-red-50" title="Eliminar" onClick={() => setDeleteQuestionId(q.id)}>
                          <Trash2 size={15} style={{ color: colors.error }} />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {showQuestionDrawer && <QuestionDrawer onClose={() => setShowQuestionDrawer(false)} questionToEdit={questionToEdit} viewOnly={viewOnlyDrawer} />}

      <Dialog 
        open={!!deleteQuestionId} 
        onClose={() => setDeleteQuestionId(null)}
        PaperProps={{ style: { borderRadius: '12px' } }}
      >
        <DialogTitle className="font-semibold" style={{ color: colors.textPrimary }}>Eliminar Pregunta</DialogTitle>
        <DialogContent>
          <DialogContentText className="text-sm" style={{ color: colors.textSecondary, marginTop: '8px' }}>
            ¿Estás seguro de que deseas eliminar esta pregunta? Esta acción no se puede deshacer.
          </DialogContentText>
        </DialogContent>
        <DialogActions style={{ padding: '16px 24px' }}>
          <Button onClick={() => setDeleteQuestionId(null)} style={{ color: colors.textSecondary, textTransform: 'none', fontWeight: 500 }}>
            Cancelar
          </Button>
          <Button onClick={handleConfirmDelete} style={{ color: colors.error, textTransform: 'none', fontWeight: 600 }} autoFocus>
            Eliminar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
