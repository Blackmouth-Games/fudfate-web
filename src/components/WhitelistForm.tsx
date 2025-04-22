
import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Sparkles } from "lucide-react";

interface WhitelistFormData {
  wallet: string;
}

const WhitelistForm = () => {
  const { register, handleSubmit, formState: { isSubmitting } } = useForm<WhitelistFormData>();
  const [isSuccess, setIsSuccess] = useState(false);
  const { toast } = useToast();

  const onSubmit = async (data: WhitelistFormData) => {
    try {
      const response = await fetch('https://primary-production-fe05.up.railway.app/webhook/ae4eccb6-2001-44ad-b373-c9fe1ef3949e', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ wallet: data.wallet }),
      });

      const result = await response.json();

      // Check for success condition based on the actual response structure
      if (result.success === true || (Array.isArray(result) && result[0]?.success === true)) {
        setIsSuccess(true);
        toast({
          title: "Success! 🎉",
          description: "You're now on the whitelist!",
        });
      } else {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to join whitelist. Please try again.",
        });
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Something went wrong. Please try again.",
      });
    }
  };

  if (isSuccess) {
    return (
      <div className="text-center py-12 px-4 animate-fade-in">
        <div className="max-w-xl mx-auto space-y-6">
          <h2 className="text-3xl font-pixel-2p text-primary animate-bounce">
            <Sparkles className="inline-block mr-2" />
            Congrats! You're on the Whitelist!
          </h2>
          <p className="text-lg font-pixel text-gray-700">
            Stay tuned to our social media for more information about the next steps!
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-4 w-full max-w-lg mx-auto">
      <Input
        {...register("wallet", { required: true })}
        placeholder="Enter your Solana wallet address"
        className="font-pixel text-sm w-full"
      />
      <Button 
        type="submit" 
        disabled={isSubmitting}
        variant="glitch"
        className="font-pixel text-lg px-12 py-6 w-48"
        onClick={handleSubmit(onSubmit)}
      >
        Join Whitelist
      </Button>
    </div>
  );
};

export default WhitelistForm;
