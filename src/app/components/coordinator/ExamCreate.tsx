import { useState } from "react";
import { useNavigate } from "react-router";
import { ArrowLeft, Search, Plus, Trash2, GripVertical, ChevronUp, ChevronDown } from "lucide-react";
import { PageHeader, PrimaryBtn, colors } from "../shared";
import { Switch, FormControlLabel } from "@mui/material";
import { toast } from "sonner";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

// Mock data for Question Bank
const AVAILABLE_QUESTIONS = [
  { id: 1, text: "¿Cuál es la primera acción a tomar cuando suena una alarma de incendio bajo tierra?", category: "Seguridad Incendios", options: 4 },
  { id: 2, text: "¿Qué EPP es obligatorio al entrar en un espacio confinado?", category: "EPP", options: 4 },
  { id: 3, text: "¿Cuántos pasos hay en el procedimiento estándar LOTO?", category: "Energía", options: 4 },
  { id: 4, text: "¿Qué significa IDLH en las regulaciones de espacios confinados?", category: "Espacios Confinados", options: 4 },
  { id: 5, text: "¿Cuándo se debe inspeccionar el EPP antes de su uso?", category: "EPP", options: 4 },
  { id: 6, text: "¿Cuál es el límite de oxígeno seguro en espacios confinados?", category: "Espacios Confinados", options: 4 },
  { id: 7, text: "¿Qué extintor se utiliza para fuegos eléctricos?", category: "Seguridad Incendios", options: 4 },
];

interface Question {
  id: number;
  text: string;
  category: string;
  options: number;
}

const ItemType = "QUESTION";

const DraggableQuestion = ({ 
  question, 
  index, 
  moveQuestion, 
  removeQuestion, 
  moveUp, 
  moveDown, 
  total 
}: { 
  question: Question; 
  index: number; 
  moveQuestion: (dragIndex: number, hoverIndex: number) => void;
  removeQuestion: (id: number) => void;
  moveUp: (index: number) => void;
  moveDown: (index: number) => void;
  total: number;
}) => {
  const [{ isDragging }, drag] = useDrag({
    type: ItemType,
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, drop] = useDrop({
    accept: ItemType,
    hover(item: { index: number }) {
      if (item.index !== index) {
        moveQuestion(item.index, index);
        item.index = index;
      }
    },
  });

  return (
    <div 
      ref={(node) => drag(drop(node))} 
      className={`p-4 bg-white border rounded-xl flex gap-3 items-center ${isDragging ? 'opacity-50' : 'opacity-100'} mb-2`}
      style={{ borderColor: colors.border }}
    >
      <div className="cursor-grab text-gray-400">
        <GripVertical size={20} />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium line-clamp-2" style={{ color: colors.textPrimary }}>{question.text}</p>
        <div className="flex gap-2 mt-1">
          <span className="text-xs px-2 py-0.5 rounded-md font-medium" style={{ backgroundColor: `${colors.primary}15`, color: colors.primary }}>
            {question.category}
          </span>
        </div>
      </div>
      <div className="flex items-center gap-1">
        <div className="flex flex-col gap-0.5 mr-2">
          <button onClick={() => moveUp(index)} disabled={index === 0} className={`p-0.5 rounded hover:bg-gray-100 ${index === 0 ? 'opacity-30' : ''}`}>
            <ChevronUp size={16} />
          </button>
          <button onClick={() => moveDown(index)} disabled={index === total - 1} className={`p-0.5 rounded hover:bg-gray-100 ${index === total - 1 ? 'opacity-30' : ''}`}>
            <ChevronDown size={16} />
          </button>
        </div>
        <button onClick={() => removeQuestion(question.id)} className="p-2 rounded-lg hover:bg-red-50 text-gray-500 hover:text-red-500 transition-colors">
          <Trash2 size={16} />
        </button>
      </div>
    </div>
  );
};

export function ExamCreate() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [isRandom, setIsRandom] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedQuestions, setSelectedQuestions] = useState<Question[]>([]);

  const handleSave = () => {
    if (!name.trim()) {
      toast.error("El nombre del examen es obligatorio");
      return;
    }
    if (!description.trim()) {
      toast.error("La descripción es obligatoria");
      return;
    }
    if (selectedQuestions.length === 0) {
      toast.error("Debe seleccionar al menos 1 pregunta");
      return;
    }

    toast.success("Examen creado correctamente en estado Borrador");
    navigate("..");
  };

  const handleToggleQuestion = (question: Question) => {
    if (selectedQuestions.find(q => q.id === question.id)) {
      setSelectedQuestions(prev => prev.filter(q => q.id !== question.id));
    } else {
      setSelectedQuestions(prev => [...prev, question]);
    }
  };

  const moveQuestion = (dragIndex: number, hoverIndex: number) => {
    const newSelected = [...selectedQuestions];
    const draggedItem = newSelected[dragIndex];
    newSelected.splice(dragIndex, 1);
    newSelected.splice(hoverIndex, 0, draggedItem);
    setSelectedQuestions(newSelected);
  };

  const moveUp = (index: number) => {
    if (index === 0) return;
    moveQuestion(index, index - 1);
  };

  const moveDown = (index: number) => {
    if (index === selectedQuestions.length - 1) return;
    moveQuestion(index, index + 1);
  };

  const filteredBank = AVAILABLE_QUESTIONS.filter(q => 
    q.text.toLowerCase().includes(searchQuery.toLowerCase()) || 
    q.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="pb-10">
        <div className="flex items-center gap-3 mb-6">
          <button onClick={() => navigate("..")} className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
            <ArrowLeft size={20} style={{ color: colors.textSecondary }} />
          </button>
          <div>
            <h1 className="text-2xl font-bold" style={{ color: colors.textPrimary }}>Nuevo Examen Teórico</h1>
            <p className="text-sm mt-1" style={{ color: colors.textSecondary }}>Crea un examen a partir del banco de preguntas</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            {/* General Data Card */}
            <div className="bg-white p-6 rounded-2xl border" style={{ borderColor: colors.border }}>
              <h2 className="text-lg font-semibold mb-4" style={{ color: colors.textPrimary }}>Datos Generales</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1.5" style={{ color: colors.textPrimary }}>Nombre del Examen *</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Ej. Evaluación de Trabajo en Alturas"
                    className="w-full px-4 py-2.5 rounded-xl border text-sm outline-none transition-colors"
                    style={{ borderColor: colors.border }}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1.5" style={{ color: colors.textPrimary }}>Descripción *</label>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Breve descripción del propósito del examen..."
                    rows={3}
                    className="w-full px-4 py-2.5 rounded-xl border text-sm outline-none resize-none transition-colors"
                    style={{ borderColor: colors.border }}
                  />
                </div>
                <div className="pt-2">
                  <FormControlLabel
                    control={<Switch checked={isRandom} onChange={(e) => setIsRandom(e.target.checked)} color="primary" />}
                    label={
                      <div>
                        <span className="text-sm font-medium block" style={{ color: colors.textPrimary }}>Orden Aleatorio de Preguntas</span>
                        <span className="text-xs text-gray-500">Si se activa, el orden definido aquí será ignorado y cada empleado verá las preguntas en distinto orden.</span>
                      </div>
                    }
                  />
                </div>
              </div>
            </div>

            {/* Questions Selection Panels */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Question Bank (Left) */}
              <div className="bg-white p-5 rounded-2xl border flex flex-col h-[600px]" style={{ borderColor: colors.border }}>
                <h3 className="font-semibold mb-4 flex items-center gap-2" style={{ color: colors.textPrimary }}>
                  Banco de Preguntas
                  <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">{AVAILABLE_QUESTIONS.length}</span>
                </h3>
                
                <div className="relative mb-4">
                  <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Buscar pregunta o categoría..."
                    className="w-full pl-9 pr-4 py-2 rounded-xl border text-sm outline-none"
                    style={{ borderColor: colors.border }}
                  />
                </div>

                <div className="flex-1 overflow-y-auto space-y-2 pr-1">
                  {filteredBank.length === 0 ? (
                    <div className="text-center py-10 text-gray-500 text-sm">No se encontraron preguntas</div>
                  ) : (
                    filteredBank.map(q => {
                      const isSelected = selectedQuestions.some(sq => sq.id === q.id);
                      return (
                        <div 
                          key={q.id}
                          onClick={() => handleToggleQuestion(q)}
                          className={`p-3 border rounded-xl cursor-pointer transition-colors ${isSelected ? 'bg-blue-50/50 border-blue-200' : 'bg-white hover:bg-gray-50'}`}
                          style={{ borderColor: isSelected ? colors.primary : colors.border }}
                        >
                          <div className="flex gap-3">
                            <div className="mt-0.5">
                              <div className={`w-4 h-4 rounded-sm border flex items-center justify-center ${isSelected ? 'bg-blue-600 border-blue-600' : 'border-gray-300'}`}>
                                {isSelected && <svg width="10" height="8" viewBox="0 0 10 8" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>}
                              </div>
                            </div>
                            <div>
                              <p className="text-sm font-medium line-clamp-2" style={{ color: colors.textPrimary }}>{q.text}</p>
                              <span className="inline-block mt-1.5 text-[11px] px-2 py-0.5 rounded font-medium bg-gray-100 text-gray-600">
                                {q.category}
                              </span>
                            </div>
                          </div>
                        </div>
                      )
                    })
                  )}
                </div>
              </div>

              {/* Selected Questions (Right) */}
              <div className="bg-gray-50 p-5 rounded-2xl border flex flex-col h-[600px]" style={{ borderColor: colors.border }}>
                <h3 className="font-semibold mb-4 flex items-center justify-between" style={{ color: colors.textPrimary }}>
                  <span>Preguntas Seleccionadas</span>
                  <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full font-medium">{selectedQuestions.length}</span>
                </h3>

                <div className="flex-1 overflow-y-auto pr-1">
                  {selectedQuestions.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-full text-center p-6 text-gray-500">
                      <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mb-3">
                        <Plus size={24} className="text-gray-400" />
                      </div>
                      <p className="text-sm font-medium text-gray-700 mb-1">Ninguna pregunta seleccionada</p>
                      <p className="text-xs">Selecciona preguntas del panel izquierdo para añadirlas a tu examen.</p>
                    </div>
                  ) : (
                    <div>
                      {selectedQuestions.map((q, index) => (
                        <DraggableQuestion
                          key={q.id}
                          index={index}
                          question={q}
                          moveQuestion={moveQuestion}
                          removeQuestion={(id) => setSelectedQuestions(prev => prev.filter(x => x.id !== id))}
                          moveUp={moveUp}
                          moveDown={moveDown}
                          total={selectedQuestions.length}
                        />
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Action Sidebar */}
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-2xl border sticky top-6" style={{ borderColor: colors.border }}>
              <h3 className="font-semibold mb-4" style={{ color: colors.textPrimary }}>Resumen del Examen</h3>
              
              <div className="space-y-3 mb-6 text-sm">
                <div className="flex justify-between">
                  <span style={{ color: colors.textSecondary }}>Preguntas totales:</span>
                  <span className="font-medium" style={{ color: colors.textPrimary }}>{selectedQuestions.length}</span>
                </div>
                <div className="flex justify-between">
                  <span style={{ color: colors.textSecondary }}>Orden:</span>
                  <span className="font-medium" style={{ color: colors.textPrimary }}>{isRandom ? "Aleatorio" : "Fijo"}</span>
                </div>
                <div className="flex justify-between">
                  <span style={{ color: colors.textSecondary }}>Estado inicial:</span>
                  <span className="font-medium text-orange-600 bg-orange-50 px-2 py-0.5 rounded-md">Borrador</span>
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <PrimaryBtn onClick={handleSave} className="w-full justify-center">Guardar Examen</PrimaryBtn>
                <button 
                  onClick={() => navigate("..")} 
                  className="w-full py-2.5 px-4 rounded-xl text-sm font-semibold border transition-colors hover:bg-gray-50"
                  style={{ borderColor: colors.border, color: colors.textPrimary }}
                >
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DndProvider>
  );
}
