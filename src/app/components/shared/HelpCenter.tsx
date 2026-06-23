import { useState } from "react";
import { Search, ChevronDown, BookOpen, FileText, ExternalLink } from "lucide-react";
import { TextField, InputAdornment, Accordion, AccordionSummary, AccordionDetails, Button } from "@mui/material";
import { useAuth } from "../../context/AuthContext";
import { getFaqsByRole, manualConfig } from "../../data/helpStore";
import { PageHeader, Card, colors } from "./index";

export function HelpCenter() {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");

  if (!user || !user.role) return null;

  const faqs = getFaqsByRole(user.role);

  const filteredFaqs = faqs.filter(
    (f) =>
      f.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      f.answer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleViewManual = () => {
    const url = manualConfig[user.role as keyof typeof manualConfig] || manualConfig.employee;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="max-w-5xl mx-auto">
      <PageHeader
        title="Centro de Ayuda"
        subtitle="Encuentre respuestas a sus preguntas y manuales de usuario"
      />

      <div className="mb-8">
        <TextField
          fullWidth
          placeholder="Buscar en preguntas frecuentes..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: "0.5rem",
              backgroundColor: "white",
            },
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search size={20} style={{ color: colors.textSecondary }} />
              </InputAdornment>
            ),
          }}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* FAQs */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center"
              style={{ backgroundColor: `${colors.primary}15`, color: colors.primary }}
            >
              <FileText size={18} />
            </div>
            <h2 className="text-lg font-semibold" style={{ color: colors.textPrimary }}>
              Preguntas Frecuentes
            </h2>
          </div>

          {filteredFaqs.length === 0 ? (
            <p className="text-sm" style={{ color: colors.textSecondary }}>
              No se encontraron preguntas frecuentes.
            </p>
          ) : (
            <div className="space-y-3">
              {filteredFaqs.map((faq) => (
                <Accordion
                  key={faq.id}
                  sx={{
                    boxShadow: "none",
                    border: `1px solid ${colors.border}`,
                    "&:before": { display: "none" },
                    borderRadius: "8px !important",
                    overflow: "hidden",
                  }}
                >
                  <AccordionSummary expandIcon={<ChevronDown size={18} />}>
                    <p className="font-medium text-sm" style={{ color: colors.textPrimary }}>
                      {faq.question}
                    </p>
                  </AccordionSummary>
                  <AccordionDetails sx={{ borderTop: `1px solid ${colors.border}`, backgroundColor: "#FAFAFA" }}>
                    <p className="text-sm" style={{ color: colors.textSecondary }}>
                      {faq.answer}
                    </p>
                  </AccordionDetails>
                </Accordion>
              ))}
            </div>
          )}
        </div>

        {/* Manuals */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center"
              style={{ backgroundColor: `${colors.secondary}15`, color: colors.secondary }}
            >
              <BookOpen size={18} />
            </div>
            <h2 className="text-lg font-semibold" style={{ color: colors.textPrimary }}>
              Manual de Usuario
            </h2>
          </div>

          <Card>
            <div className="flex flex-col xl:flex-row gap-6 items-start">
              {/* Preview Box */}
              <div 
                className="w-full xl:w-2/5 aspect-[3/4] bg-gray-100 rounded-lg border border-gray-200 overflow-hidden relative shadow-sm shrink-0 group"
              >
                <img 
                  src="https://images.unsplash.com/photo-1695634281181-b2357af34c61?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkb2N1bWVudCUyMG1vY2t1cCUyMFBERnxlbnwxfHx8fDE3ODIxNjYxMzF8MA&ixlib=rb-4.1.0&q=80&w=1080" 
                  alt="Vista previa del manual" 
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-3 pointer-events-none">
                  <span className="text-white text-xs font-medium">PDF • 2.4 MB</span>
                </div>
              </div>

              {/* Info & View */}
              <div className="flex-1 flex flex-col h-full justify-between">
                <div>
                  <h3 className="font-semibold text-lg mb-2" style={{ color: colors.textPrimary }}>
                    Manual de Usuario SafeMining
                  </h3>
                  <p className="text-sm text-gray-600 mb-6 leading-relaxed">
                    Acceda a la última versión de nuestro manual integral. Incluye guías paso a paso, configuración de visores, resolución de problemas comunes y mejores prácticas para optimizar sus sesiones de entrenamiento en realidad virtual.
                  </p>
                </div>
                
                <Button
                  variant="contained"
                  startIcon={<ExternalLink size={18} />}
                  onClick={handleViewManual}
                  sx={{
                    backgroundColor: colors.secondary,
                    color: "white",
                    textTransform: "none",
                    fontWeight: 600,
                    boxShadow: "none",
                    padding: "10px 16px",
                    "&:hover": {
                      backgroundColor: colors.secondary,
                      opacity: 0.9,
                      boxShadow: "none",
                    },
                  }}
                  fullWidth
                >
                  Ver Manual
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}