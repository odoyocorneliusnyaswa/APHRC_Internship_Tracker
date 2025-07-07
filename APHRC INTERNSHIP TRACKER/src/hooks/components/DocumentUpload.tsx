import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  FileUp, 
  File, 
  Download, 
  Trash2,
  Upload,
  FolderOpen
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface DocumentFile {
  id: string;
  name: string;
  type: string;
  size: number;
  uploadedAt: string;
  category: string;
}

export function DocumentUpload() {
  const { toast } = useToast();
  const [documents] = useState<DocumentFile[]>([
    {
      id: "1",
      name: "Internship_Agreement_JohnDoe.pdf",
      type: "application/pdf",
      size: 245760,
      uploadedAt: "2024-01-15",
      category: "agreements"
    },
    {
      id: "2",
      name: "Contract_Signed.pdf",
      type: "application/pdf",
      size: 189440,
      uploadedAt: "2024-01-16",
      category: "contracts"
    },
    {
      id: "3",
      name: "Weekly_Report_Week1.pdf",
      type: "application/pdf",
      size: 98304,
      uploadedAt: "2024-01-19",
      category: "reports"
    },
    {
      id: "4",
      name: "Certificate_Training.pdf",
      type: "application/pdf",
      size: 156672,
      uploadedAt: "2024-01-22",
      category: "certificates"
    }
  ]);

  const categories = [
    { id: 'agreements', label: 'Internship Agreements', icon: File },
    { id: 'contracts', label: 'Contracts', icon: File },
    { id: 'reports', label: 'Reports & Summaries', icon: FileUp },
    { id: 'certificates', label: 'Certificates', icon: File },
  ];

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getDocumentsByCategory = (categoryId: string) => {
    return documents.filter(doc => doc.category === categoryId);
  };

  const handleUpload = (category: string) => {
    toast({
      title: "File Upload",
      description: `File upload for ${category} category initiated.`,
    });
  };

  const handleDelete = (documentId: string, fileName: string) => {
    toast({
      title: "File Deleted",
      description: `${fileName} has been removed.`,
      variant: "destructive",
    });
  };

  const handleDownload = (fileName: string) => {
    toast({
      title: "Download Started",
      description: `Downloading ${fileName}...`,
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-foreground">Document Management</h2>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <FolderOpen className="h-4 w-4" />
          {documents.length} documents stored
        </div>
      </div>

      {/* Upload Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Upload className="h-5 w-5" />
            Quick Upload
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
            <FileUp className="mx-auto h-16 w-16 text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium text-foreground mb-2">
              Upload Documents
            </h3>
            <p className="text-muted-foreground mb-4">
              Drag and drop files here, or click to select files
            </p>
            <p className="text-sm text-muted-foreground mb-6">
              Supported formats: PDF, DOC, DOCX, JPG, PNG (Max 10MB)
            </p>
            <Button>
              <FileUp className="h-4 w-4 mr-2" />
              Choose Files
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Document Categories */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {categories.map((category) => {
          const categoryDocs = getDocumentsByCategory(category.id);
          const Icon = category.icon;
          
          return (
            <Card key={category.id}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <Icon className="h-5 w-5" />
                    {category.label}
                  </CardTitle>
                  <Badge variant="secondary">
                    {categoryDocs.length} files
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {categoryDocs.length === 0 ? (
                    <div className="text-center py-6">
                      <Icon className="mx-auto h-12 w-12 text-muted-foreground mb-2" />
                      <p className="text-sm text-muted-foreground">No files uploaded yet</p>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="mt-3"
                        onClick={() => handleUpload(category.label)}
                      >
                        Upload Files
                      </Button>
                    </div>
                  ) : (
                    <>
                      {categoryDocs.map((doc) => (
                        <div key={doc.id} className="flex items-center justify-between p-3 border border-border rounded-lg hover:bg-muted/50">
                          <div className="flex items-center gap-3">
                            <div className="p-2 bg-primary/10 rounded">
                              <File className="h-4 w-4 text-primary" />
                            </div>
                            <div>
                              <p className="font-medium text-foreground text-sm">
                                {doc.name}
                              </p>
                              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                <span>{formatFileSize(doc.size)}</span>
                                <span>•</span>
                                <span>{new Date(doc.uploadedAt).toLocaleDateString()}</span>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-1">
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => handleDownload(doc.name)}
                            >
                              <Download className="h-3 w-3" />
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => handleDelete(doc.id, doc.name)}
                            >
                              <Trash2 className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                      ))}
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="w-full mt-3"
                        onClick={() => handleUpload(category.label)}
                      >
                        <FileUp className="h-3 w-3 mr-2" />
                        Add More Files
                      </Button>
                    </>
                  )}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Storage Info */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium text-foreground">Storage Usage</h3>
              <p className="text-sm text-muted-foreground">
                {formatFileSize(documents.reduce((total, doc) => total + doc.size, 0))} of 1GB used
              </p>
            </div>
            <div className="w-48 bg-muted rounded-full h-2">
              <div 
                className="bg-primary h-2 rounded-full" 
                style={{ 
                  width: `${Math.min((documents.reduce((total, doc) => total + doc.size, 0) / (1024 * 1024 * 1024)) * 100, 100)}%` 
                }}
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}