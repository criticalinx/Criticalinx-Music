'use client';

import { useState, useRef } from 'react';
import { Upload, Music, X, CheckCircle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/lib/supabase';

export default function UploadPage() {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [genre, setGenre] = useState('');
  const [vibe, setVibe] = useState('');
  const [price, setPrice] = useState('0.00');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      const validTypes = ['audio/mpeg', 'audio/wav', 'audio/flac', 'audio/mp3'];
      const maxSize = 500 * 1024 * 1024;

      if (!validTypes.includes(selectedFile.type) && !selectedFile.name.match(/\.(mp3|wav|flac)$/i)) {
        toast({
          title: 'Invalid file type',
          description: 'Please upload an MP3, WAV, or FLAC file.',
          variant: 'destructive',
        });
        return;
      }

      if (selectedFile.size > maxSize) {
        toast({
          title: 'File too large',
          description: 'Please upload a file smaller than 500MB.',
          variant: 'destructive',
        });
        return;
      }

      setFile(selectedFile);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files?.[0];
    if (droppedFile) {
      const event = { target: { files: [droppedFile] } } as any;
      handleFileChange(event);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const removeFile = () => {
    setFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSubmit = async (isDraft: boolean) => {
    if (!file || !title) {
      toast({
        title: 'Missing information',
        description: 'Please provide a file and track title.',
        variant: 'destructive',
      });
      return;
    }

    setUploading(true);

    try {
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) {
        toast({
          title: 'Authentication required',
          description: 'Please sign in to upload tracks.',
          variant: 'destructive',
        });
        setUploading(false);
        return;
      }

      const fileExt = file.name.split('.').pop();
      const fileName = `${user.id}-${Date.now()}.${fileExt}`;
      const filePath = `tracks/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('audio')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { error: insertError } = await supabase
        .from('tracks')
        .insert({
          title,
          description,
          genre,
          vibe,
          price: parseFloat(price),
          file_path: filePath,
          artist_id: user.id,
          status: isDraft ? 'draft' : 'published',
        });

      if (insertError) throw insertError;

      toast({
        title: isDraft ? 'Draft saved' : 'Track published',
        description: isDraft ? 'Your track has been saved as a draft.' : 'Your track is now live!',
      });

      setFile(null);
      setTitle('');
      setDescription('');
      setGenre('');
      setVibe('');
      setPrice('0.00');
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    } catch (error) {
      toast({
        title: 'Upload failed',
        description: error instanceof Error ? error.message : 'An error occurred during upload.',
        variant: 'destructive',
      });
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="container section-padding max-w-4xl">
      <div className="space-y-8">
        <div>
          <h1>Upload Track</h1>
          <p className="text-muted-foreground mt-2">
            Share your positive music with the world. Keep 99% of revenue.
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Track Details</CardTitle>
            <CardDescription>
              Upload your audio file and add information about your track.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed rounded-lg p-12 text-center space-y-4 hover:border-primary/50 transition-colors cursor-pointer"
            >
              <input
                ref={fileInputRef}
                type="file"
                accept="audio/mpeg,audio/wav,audio/flac,.mp3,.wav,.flac"
                onChange={handleFileChange}
                className="hidden"
              />
              {file ? (
                <div className="space-y-2">
                  <div className="w-16 h-16 rounded-full bg-green-500/10 flex items-center justify-center mx-auto">
                    <CheckCircle className="h-8 w-8 text-green-500" />
                  </div>
                  <p className="font-medium">{file.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {(file.size / (1024 * 1024)).toFixed(2)} MB
                  </p>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      removeFile();
                    }}
                  >
                    <X className="h-4 w-4 mr-1" />
                    Remove
                  </Button>
                </div>
              ) : (
                <>
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                    <Upload className="h-8 w-8 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">Drop your audio file here</p>
                    <p className="text-sm text-muted-foreground">or click to browse</p>
                    <p className="text-xs text-muted-foreground mt-2">
                      Supports MP3, WAV, FLAC (max 500MB)
                    </p>
                  </div>
                </>
              )}
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Track Title *</Label>
                <Input
                  id="title"
                  placeholder="Enter track title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Tell us about your track..."
                  rows={4}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="genre">Genre</Label>
                  <Select value={genre} onValueChange={setGenre}>
                    <SelectTrigger id="genre">
                      <SelectValue placeholder="Select genre" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pop">Pop</SelectItem>
                      <SelectItem value="rock">Rock</SelectItem>
                      <SelectItem value="electronic">Electronic</SelectItem>
                      <SelectItem value="acoustic">Acoustic</SelectItem>
                      <SelectItem value="hip-hop">Hip Hop</SelectItem>
                      <SelectItem value="indie">Indie</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="vibe">Vibe</Label>
                  <Select value={vibe} onValueChange={setVibe}>
                    <SelectTrigger id="vibe">
                      <SelectValue placeholder="Select vibe" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="energetic">Energetic</SelectItem>
                      <SelectItem value="chill">Chill</SelectItem>
                      <SelectItem value="motivational">Motivational</SelectItem>
                      <SelectItem value="peaceful">Peaceful</SelectItem>
                      <SelectItem value="joyful">Joyful</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="price">Price (USD)</Label>
                <Input
                  id="price"
                  type="number"
                  placeholder="0.00"
                  step="0.01"
                  min="0"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
                <p className="text-xs text-muted-foreground">
                  Set to $0.00 for free streaming. You keep 99% of paid sales.
                </p>
              </div>
            </div>

            <div className="flex gap-3 pt-4">
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => handleSubmit(true)}
                disabled={uploading}
              >
                Save as Draft
              </Button>
              <Button
                className="flex-1 bg-primary"
                onClick={() => handleSubmit(false)}
                disabled={uploading}
              >
                <Music className="h-4 w-4 mr-2" />
                {uploading ? 'Uploading...' : 'Publish Track'}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}