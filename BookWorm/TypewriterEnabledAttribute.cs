namespace BookWorm
{
    /// <summary>
    /// Use this attribute to generate client-side typewriter classes out of this class.
    /// </summary>
    [AttributeUsage(AttributeTargets.Class | AttributeTargets.Enum | AttributeTargets.Struct)]
    public class TypewriterEnabledAttribute : Attribute
    {
    }
}
