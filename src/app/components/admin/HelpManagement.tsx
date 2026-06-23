import { useState } from "react";
import { Plus, Edit2, Trash2, Link as LinkIcon, Save } from "lucide-react";
import { Button, TextField, Dialog, DialogTitle, DialogContent, DialogActions, FormControl, InputLabel, Select, MenuItem, OutlinedInput, Checkbox, ListItemText, Tab, Tabs } from "@mui/material";
import { PageHeader, Card, colors, StatusBadge } from "../shared";
import { mockFaqs, FAQ, manualConfig } from "../../data/helpStore";
import { Role } from "../../context/AuthContext";
import { toast } from "sonner";

const ROLES: { value: Role; label: string }[] = [
  { value: "admin", label: "Administrador del Sistema" },
  { value: "company", label: "Administrador de Empresa" },
  { value: "coordinator", label: "Coordinador" },
  { value: "employee", label: "Empleado" },
];

export function HelpManagement() {
  const [activeTab, setActiveTab] = useState(0);
  const [faqs, setFaqs] = useState<FAQ[]>(mockFaqs);
  const [manualUrls, setManualUrls] = useState({ ...manualConfig });

  // Dialog State
  const [isFaqOpen, setIsFaqOpen] = useState(false);

  // Form State
  const [editingId, setEditingId] = useState<string | null>(null);
  
  // FAQ form
  const [faqQuestion, setFaqQuestion] = useState("");
  const [faqAnswer, setFaqAnswer] = useState("");
  const [faqRoles, setFaqRoles] = useState<Role[]>([]);
  const [faqIsActive, setFaqIsActive] = useState(true);

  // --- FAQ Actions ---
  const openFaqDialog = (faq?: FAQ) => {
    if (faq) {
      setEditingId(faq.id);
      setFaqQuestion(faq.question);
      setFaqAnswer(faq.answer);
      setFaqRoles(faq.roles);
      setFaqIsActive(faq.isActive);
    } else {
      setEditingId(null);
      setFaqQuestion("");
      setFaqAnswer("");
      setFaqRoles([]);
      setFaqIsActive(true);
    }
    setIsFaqOpen(true);
  };

  const saveFaq = () => {
    if (editingId) {
      setFaqs(faqs.map(f => f.id === editingId ? { ...f, question: faqQuestion, answer: faqAnswer, roles: faqRoles, isActive: faqIsActive } : f));
      toast.success("Pregunta actualizada correctamente");
    } else {
      setFaqs([...faqs, { id: `f${Date.now()}`, question: faqQuestion, answer: faqAnswer, roles: faqRoles, isActive: true }]);
      toast.success("Pregunta creada correctamente");
    }
    setIsFaqOpen(false);
  };

  const deleteFaq = (id: string) => {
    setFaqs(faqs.map(f => f.id === id ? { ...f, isActive: false } : f));
    toast.info("Pregunta dada de baja");
  };

  const saveManualUrl = () => {
    Object.assign(manualConfig, manualUrls);
    toast.success("Enlaces de los manuales actualizados");
  };

  return (
    <div>
      <PageHeader
        title="Gestión de Ayuda y Soporte"
        subtitle="Administre las preguntas frecuentes y el enlace al manual de usuario"
        action={
          activeTab === 0 && (
            <Button
              variant="contained"
              startIcon={<Plus size={18} />}
              onClick={() => openFaqDialog()}
              sx={{
                backgroundColor: colors.primary,
                textTransform: "none",
                "&:hover": { backgroundColor: "#ea580c" },
              }}
            >
              Nueva Pregunta
            </Button>
          )
        }
      />

      <Tabs
        value={activeTab}
        onChange={(_, val) => setActiveTab(val)}
        sx={{ borderBottom: 1, borderColor: "divider", mb: 4 }}
        TabIndicatorProps={{ style: { backgroundColor: colors.primary } }}
      >
        <Tab label="Preguntas Frecuentes (FAQ)" sx={{ textTransform: "none", fontWeight: 600, '&.Mui-selected': { color: colors.primary } }} />
        <Tab label="Configuración del Manual" sx={{ textTransform: "none", fontWeight: 600, '&.Mui-selected': { color: colors.primary } }} />
      </Tabs>

      {/* Tab 0: FAQs */}
      {activeTab === 0 && (
        <Card>
          <table className="w-full text-sm">
            <thead>
              <tr style={{ borderBottom: `1px solid ${colors.border}` }}>
                <th className="pb-2 text-left text-xs font-semibold uppercase" style={{ color: colors.textSecondary }}>Pregunta</th>
                <th className="pb-2 text-left text-xs font-semibold uppercase" style={{ color: colors.textSecondary }}>Roles Destino</th>
                <th className="pb-2 text-left text-xs font-semibold uppercase" style={{ color: colors.textSecondary }}>Estado</th>
                <th className="pb-2 text-right text-xs font-semibold uppercase" style={{ color: colors.textSecondary }}>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {faqs.map(faq => (
                <tr key={faq.id} style={{ borderBottom: `1px solid ${colors.border}` }}>
                  <td className="py-3 font-medium pr-4" style={{ color: colors.textPrimary }}>{faq.question}</td>
                  <td className="py-3 pr-4 text-xs" style={{ color: colors.textSecondary }}>
                    {faq.roles.map(r => ROLES.find(x => x.value === r)?.label).join(", ")}
                  </td>
                  <td className="py-3 pr-4">
                    <StatusBadge status={faq.isActive ? "active" : "draft"} />
                  </td>
                  <td className="py-3 text-right">
                    <button onClick={() => openFaqDialog(faq)} className="p-1 hover:bg-gray-100 rounded text-gray-500 mr-1" title="Editar">
                      <Edit2 size={16} />
                    </button>
                    {faq.isActive && (
                      <button onClick={() => deleteFaq(faq.id)} className="p-1 hover:bg-red-50 rounded text-red-500" title="Dar de baja">
                        <Trash2 size={16} />
                      </button>
                    )}
                  </td>
                </tr>
              ))}
              {faqs.length === 0 && (
                <tr>
                  <td colSpan={4} className="py-4 text-center text-gray-500">No hay preguntas frecuentes registradas.</td>
                </tr>
              )}
            </tbody>
          </table>
        </Card>
      )}

      {/* Tab 1: Manual */}
      {activeTab === 1 && (
        <div className="max-w-2xl">
          <Card>
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 rounded-lg bg-orange-100 text-orange-600">
                  <LinkIcon size={20} />
                </div>
                <div>
                  <h3 className="font-semibold text-lg" style={{ color: colors.textPrimary }}>Enlace del Manual de Usuario</h3>
                  <p className="text-sm text-gray-500">Configure la URL externa donde se encuentra alojado el manual en formato PDF.</p>
                </div>
              </div>

              <div className="space-y-4">
                {ROLES.map((role) => (
                  <TextField
                    key={role.value}
                    fullWidth
                    label={`URL del Manual - ${role.label}`}
                    placeholder={`https://ejemplo.com/manual-${role.value}.pdf`}
                    value={manualUrls[role.value as keyof typeof manualUrls] || ""}
                    onChange={(e) => setManualUrls({ ...manualUrls, [role.value]: e.target.value })}
                    variant="outlined"
                    size="small"
                  />
                ))}
                
                <p className="text-xs text-gray-500 mt-2">
                  Estos enlaces serán accesibles para los usuarios desde el Centro de Ayuda según su rol.
                </p>
                <div className="flex justify-end pt-2">
                  <Button
                    variant="contained"
                    startIcon={<Save size={18} />}
                    onClick={saveManualUrl}
                    sx={{
                      backgroundColor: colors.primary,
                      textTransform: "none",
                      px: 4,
                      "&:hover": { backgroundColor: "#ea580c" },
                    }}
                  >
                    Guardar Cambios
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* FAQ Dialog */}
      <Dialog open={isFaqOpen} onClose={() => setIsFaqOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>{editingId ? "Editar Pregunta" : "Nueva Pregunta Frecuente"}</DialogTitle>
        <DialogContent dividers className="space-y-4">
          <TextField
            fullWidth
            label="Pregunta"
            value={faqQuestion}
            onChange={(e) => setFaqQuestion(e.target.value)}
            margin="dense"
            size="small"
          />
          <TextField
            fullWidth
            label="Respuesta"
            multiline
            rows={4}
            value={faqAnswer}
            onChange={(e) => setFaqAnswer(e.target.value)}
            margin="dense"
            size="small"
          />
          <FormControl fullWidth size="small" margin="dense">
            <InputLabel>Roles Destino</InputLabel>
            <Select
              multiple
              value={faqRoles}
              onChange={(e) => setFaqRoles(typeof e.target.value === 'string' ? e.target.value.split(',') as Role[] : e.target.value as Role[])}
              input={<OutlinedInput label="Roles Destino" />}
              renderValue={(selected) => selected.map(v => ROLES.find(r => r.value === v)?.label).join(', ')}
            >
              {ROLES.map((role) => (
                <MenuItem key={role.value} value={role.value}>
                  <Checkbox checked={faqRoles.indexOf(role.value) > -1} />
                  <ListItemText primary={role.label} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          
          {editingId && (
            <div className="flex items-center gap-2 mt-4 pt-4 border-t">
              <span className="text-sm font-medium" style={{ color: colors.textPrimary }}>Estado Activo:</span>
              <button
                onClick={() => setFaqIsActive(!faqIsActive)}
                className={`w-12 h-6 rounded-full transition-colors relative flex items-center ${faqIsActive ? 'bg-orange-500' : 'bg-gray-300'}`}
              >
                <div className={`w-4 h-4 rounded-full bg-white absolute transition-transform ${faqIsActive ? 'translate-x-7' : 'translate-x-1'}`} />
              </button>
            </div>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsFaqOpen(false)} sx={{ color: colors.textSecondary }}>Cancelar</Button>
          <Button onClick={saveFaq} variant="contained" sx={{ backgroundColor: colors.primary, "&:hover": { backgroundColor: "#ea580c" } }}>
            Guardar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
